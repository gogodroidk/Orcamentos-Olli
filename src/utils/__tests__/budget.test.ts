import { describe, expect, it } from 'vitest';
import { Orcamento } from '../../types';
import { calculateBudgetTotals } from '../budget';

function budget(overrides: Partial<Orcamento> = {}): Orcamento {
  return {
    id: 'orc-1',
    numero: '00126',
    clienteId: 'cli-1',
    clienteNome: 'Cliente',
    clienteTelefone: '11999999999',
    itens: [
      { id: '1', tipo: 'servico', catalogoId: 's1', nome: 'Instalação', preco: 500, quantidade: 2, unidade: 'un', subtotal: 1000 },
      { id: '2', tipo: 'produto', catalogoId: 'p1', nome: 'Peça', preco: 250, quantidade: 1, unidade: 'un', subtotal: 250 },
    ],
    subtotalServicos: 0,
    subtotalProdutos: 0,
    subtotal: 0,
    desconto: 10,
    descontoTipo: 'percentual',
    valorTotal: 0,
    status: 'rascunho',
    dataEmissao: '2026-08-12',
    formasPagamento: { credito: false, debito: false, dinheiro: false, pix: true },
    exibirAssinatura: true,
    solicitarAssinaturaCliente: false,
    exibirAprovacao: true,
    exibirRecusa: true,
    criadoEm: '2026-08-12T12:00:00.000Z',
    atualizadoEm: '2026-08-12T12:00:00.000Z',
    ...overrides,
  };
}

describe('calculateBudgetTotals', () => {
  it('separa serviços e produtos e aplica desconto percentual', () => {
    const result = calculateBudgetTotals(budget());
    expect(result.subtotalServicos).toBe(1000);
    expect(result.subtotalProdutos).toBe(250);
    expect(result.subtotal).toBe(1250);
    expect(result.valorTotal).toBe(1125);
  });

  it('nunca produz total negativo', () => {
    const result = calculateBudgetTotals(budget({ desconto: 5000, descontoTipo: 'valor' }));
    expect(result.valorTotal).toBe(0);
  });
});
