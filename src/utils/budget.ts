import { Orcamento } from '../types';

/** Recalcula os totais do orçamento a partir dos itens e do desconto atual. */
export function calculateBudgetTotals(orcamento: Orcamento): Orcamento {
  const subtotalServicos = orcamento.itens
    .filter(item => item.tipo === 'servico')
    .reduce((total, item) => total + item.subtotal, 0);
  const subtotalProdutos = orcamento.itens
    .filter(item => item.tipo === 'produto')
    .reduce((total, item) => total + item.subtotal, 0);
  const subtotal = subtotalServicos + subtotalProdutos;
  const descontoCalculado = orcamento.descontoTipo === 'percentual'
    ? subtotal * (orcamento.desconto / 100)
    : orcamento.desconto;

  return {
    ...orcamento,
    subtotalServicos,
    subtotalProdutos,
    subtotal,
    valorTotal: Math.max(0, subtotal - descontoCalculado),
  };
}
