import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Dimensions, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart } from 'react-native-gifted-charts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, BorderRadius, Shadow, Gradients } from '../theme';
import { getOrcamentos, getEmpresa } from '../database/database';
import { formatCurrency } from '../utils/currency';
import { formatDate } from '../utils/date';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Empresa, Orcamento } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { OlliLogo } from '../components/OlliLogo';

type Nav = NativeStackNavigationProp<RootStackParamList>;
const SCREEN_W = Dimensions.get('window').width;
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function saudacao(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function HomeScreen() {
  const nav = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const [all, emp] = await Promise.all([getOrcamentos(), getEmpresa()]);
    setOrcamentos(all);
    setEmpresa(emp);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const refresh = async () => { setRefreshing(true); await load(); setRefreshing(false); };

  // ── métricas ──
  const aprovados = orcamentos.filter(o => o.status === 'aprovado');
  const faturamentoTotal = aprovados.reduce((s, o) => s + o.valorTotal, 0);
  const abertos = orcamentos.filter(o => o.status === 'enviado' || o.status === 'aguardando_assinatura').length;
  const recusados = orcamentos.filter(o => o.status === 'recusado').length;
  const ticket = aprovados.length ? faturamentoTotal / aprovados.length : 0;
  const taxaConversao = orcamentos.length ? Math.round((aprovados.length / orcamentos.length) * 100) : 0;

  // ── gráfico: faturamento dos últimos 6 meses ──
  const now = new Date();
  const barData = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const total = aprovados
      .filter(o => { const od = new Date(o.criadoEm); return od.getFullYear() === d.getFullYear() && od.getMonth() === d.getMonth(); })
      .reduce((s, o) => s + o.valorTotal, 0);
    return {
      value: total,
      label: MESES[d.getMonth()],
      frontColor: i === 5 ? Colors.primary : Colors.secondary,
      topLabelComponent: () => total > 0 ? <Text style={styles.barTop}>{(total / 1000).toFixed(0)}k</Text> : null,
    };
  });
  const maxBar = Math.max(...barData.map(b => b.value), 1);
  const recentes = orcamentos.slice(0, 5);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} colors={[Colors.primary]} tintColor={Colors.primary} />}
      >
        {/* HERO */}
        <LinearGradient colors={Gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.hero, { paddingTop: insets.top + 16 }]}>
          <View style={styles.heroTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>{saudacao()},</Text>
              <Text style={styles.empresaName} numberOfLines={1}>{empresa?.nomePrestador?.split(' ')[0] || 'bem-vindo'}!</Text>
            </View>
            <TouchableOpacity style={styles.profileBtn} onPress={() => { Haptics.selectionAsync().catch(() => {}); nav.navigate('MeuNegocio'); }} activeOpacity={0.8}>
              {empresa?.logoUri ? (
                <Image source={{ uri: empresa.logoUri }} style={styles.profileLogo} />
              ) : (
                <OlliLogo size={44} tile={false} ringColor="#fff" />
              )}
            </TouchableOpacity>
          </View>

          {/* CARD FATURAMENTO */}
          <View style={styles.fatCard}>
            <Text style={styles.fatLabel}>Faturamento aprovado</Text>
            <Text style={styles.fatValue}>{formatCurrency(faturamentoTotal)}</Text>
            <View style={styles.fatChips}>
              <View style={styles.fatChip}>
                <MaterialCommunityIcons name="check-decagram" size={14} color={Colors.success} />
                <Text style={styles.fatChipText}>{aprovados.length} aprovados</Text>
              </View>
              <View style={styles.fatChip}>
                <MaterialCommunityIcons name="percent" size={14} color={Colors.primary} />
                <Text style={styles.fatChipText}>{taxaConversao}% conversão</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* STATS GRID */}
        <View style={styles.statsGrid}>
          <StatBox icon="file-document-multiple" label="Orçamentos" value={String(orcamentos.length)} color={Colors.primary} index={0} />
          <StatBox icon="clock-outline" label="Em aberto" value={String(abertos)} color={Colors.warning} index={1} />
          <StatBox icon="cash-multiple" label="Ticket médio" value={formatCurrency(ticket)} color={Colors.success} index={2} small />
          <StatBox icon="close-circle-outline" label="Recusados" value={String(recusados)} color={Colors.danger} index={3} />
        </View>

        {/* GRÁFICO */}
        {faturamentoTotal > 0 && (
          <AnimatedEntrance index={4}>
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Faturamento dos últimos 6 meses</Text>
              <BarChart
                data={barData}
                barWidth={26}
                spacing={(SCREEN_W - 32 - 64 - 26 * 6) / 6}
                roundedTop
                noOfSections={3}
                maxValue={Math.ceil(maxBar * 1.2)}
                yAxisThickness={0}
                xAxisThickness={0}
                hideRules
                yAxisTextStyle={{ color: Colors.onSurfaceMuted, fontSize: 10 }}
                xAxisLabelTextStyle={{ color: Colors.onSurfaceVariant, fontSize: 11, fontWeight: '600' }}
                hideYAxisText
                disableScroll
              />
            </View>
          </AnimatedEntrance>
        )}

        {/* AÇÕES RÁPIDAS */}
        <Text style={styles.sectionTitle}>Ações rápidas</Text>
        <View style={styles.qaGrid}>
          <QuickAction icon="plus-circle" label="Novo Orçamento" color={Colors.primary} onPress={() => nav.navigate('NovoOrcamento', {})} />
          <QuickAction icon="receipt" label="Emitir Recibo" color={Colors.success} onPress={() => nav.navigate('EmitirRecibo', {})} />
          <QuickAction icon="account-group" label="Clientes" color="#7C3AED" onPress={() => nav.navigate('Clientes')} />
          <QuickAction icon="wrench" label="Serviços" color="#0891B2" onPress={() => nav.navigate('Servicos')} />
        </View>

        {/* RECENTES */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Orçamentos recentes</Text>
          <TouchableOpacity onPress={() => (nav as any).navigate('Tabs', { screen: 'Orcamentos' })}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {recentes.length === 0 ? (
          <View style={styles.emptyRecent}>
            <MaterialCommunityIcons name="file-document-outline" size={40} color={Colors.onSurfaceMuted} />
            <Text style={styles.emptyText}>Nenhum orçamento ainda</Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={() => nav.navigate('NovoOrcamento', {})}>
              <Text style={styles.emptyBtnText}>Criar primeiro orçamento</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ paddingHorizontal: Spacing.base, gap: 10 }}>
            {recentes.map((o, idx) => (
              <AnimatedEntrance key={o.id} index={idx}>
                <TouchableOpacity style={styles.recentCard} onPress={() => nav.navigate('VisualizarOrcamento', { orcamentoId: o.id })} activeOpacity={0.8}>
                  <View style={styles.recentAvatar}>
                    <Text style={styles.recentAvatarText}>{o.clienteNome.charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.recentName} numberOfLines={1}>{o.clienteNome}</Text>
                    <Text style={styles.recentMeta}>Nº {o.numero} · {formatDate(o.criadoEm)}</Text>
                    <View style={{ marginTop: 5 }}><StatusBadge status={o.status} size="sm" /></View>
                  </View>
                  <Text style={styles.recentValue}>{formatCurrency(o.valorTotal)}</Text>
                </TouchableOpacity>
              </AnimatedEntrance>
            ))}
          </View>
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: 20 }]}
        onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {}); nav.navigate('NovoOrcamento', {}); }}
        activeOpacity={0.85}
      >
        <LinearGradient colors={Gradients.primaryDiagonal} style={styles.fabGradient}>
          <MaterialCommunityIcons name="plus" size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

function StatBox({ icon, label, value, color, index, small }: { icon: any; label: string; value: string; color: string; index: number; small?: boolean }) {
  return (
    <AnimatedEntrance index={index} style={styles.statBoxWrap}>
      <View style={styles.statBox}>
        <View style={[styles.statIcon, { backgroundColor: color + '18' }]}>
          <MaterialCommunityIcons name={icon} size={20} color={color} />
        </View>
        <Text style={[styles.statValue, small && { fontSize: 15 }]} numberOfLines={1}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </AnimatedEntrance>
  );
}

function QuickAction({ icon, label, color, onPress }: { icon: any; label: string; color: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.qaBtn} onPress={() => { Haptics.selectionAsync().catch(() => {}); onPress(); }} activeOpacity={0.8}>
      <View style={[styles.qaIcon, { backgroundColor: color + '18' }]}>
        <MaterialCommunityIcons name={icon} size={26} color={color} />
      </View>
      <Text style={styles.qaLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: Spacing.base, paddingBottom: 56 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 15, color: 'rgba(255,255,255,0.85)' },
  empresaName: { fontSize: 26, fontWeight: '900', color: '#fff', marginTop: -2 },
  profileBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.16)', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)', overflow: 'hidden' },
  profileLogo: { width: 50, height: 50, resizeMode: 'cover' },
  fatCard: { backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: BorderRadius.lg, padding: Spacing.lg, marginTop: Spacing.lg, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  fatLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  fatValue: { fontSize: 32, fontWeight: '900', color: '#fff', marginVertical: 4 },
  fatChips: { flexDirection: 'row', gap: 8, marginTop: 6 },
  fatChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fff', borderRadius: BorderRadius.full, paddingHorizontal: 10, paddingVertical: 5 },
  fatChipText: { fontSize: 12, fontWeight: '700', color: Colors.onSurface },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.base - 4, marginTop: -40 },
  statBoxWrap: { width: '50%', padding: 4 },
  statBox: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.base, ...Shadow.md },
  statIcon: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statValue: { fontSize: 20, fontWeight: '800', color: Colors.onSurface },
  statLabel: { fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 1 },

  chartCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.base, margin: Spacing.base, marginTop: Spacing.sm, ...Shadow.md },
  chartTitle: { fontSize: 14, fontWeight: '700', color: Colors.onSurface, marginBottom: Spacing.base },
  barTop: { fontSize: 9, color: Colors.onSurfaceVariant, fontWeight: '700', marginBottom: 2 },

  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.onSurface, paddingHorizontal: Spacing.base, marginTop: Spacing.lg, marginBottom: Spacing.sm },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: Spacing.base },
  seeAll: { fontSize: 13, color: Colors.primary, fontWeight: '700', marginTop: Spacing.lg, marginBottom: Spacing.sm },

  qaGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.base - 4 },
  qaBtn: { width: '25%', alignItems: 'center', paddingVertical: 8 },
  qaIcon: { width: 56, height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  qaLabel: { fontSize: 11.5, fontWeight: '600', color: Colors.onSurface, textAlign: 'center' },

  emptyRecent: { alignItems: 'center', padding: Spacing.xxl },
  emptyText: { fontSize: 14, color: Colors.onSurfaceVariant, marginTop: Spacing.sm },
  emptyBtn: { marginTop: Spacing.base, backgroundColor: Colors.primaryContainer, borderRadius: BorderRadius.full, paddingHorizontal: 20, paddingVertical: 10 },
  emptyBtnText: { color: Colors.primary, fontWeight: '700', fontSize: 14 },

  recentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.base, ...Shadow.sm },
  recentAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryContainer, justifyContent: 'center', alignItems: 'center' },
  recentAvatarText: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  recentName: { fontSize: 15, fontWeight: '700', color: Colors.onSurface },
  recentMeta: { fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 2 },
  recentValue: { fontSize: 15, fontWeight: '800', color: Colors.primary, marginLeft: 8 },

  fab: { position: 'absolute', right: 20, width: 60, height: 60, borderRadius: 30, ...Shadow.lg, shadowColor: Colors.primary, shadowOpacity: 0.45 },
  fabGradient: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
});
