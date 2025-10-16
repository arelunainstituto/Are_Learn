import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create a default tenant for AreLuna Group
  const tenant = await prisma.tenant.upsert({
    where: { id: 'areluna-group' },
    update: {},
    create: {
      id: 'areluna-group',
      name: 'Grupo AreLuna',
      slug: 'areluna-group',
      isActive: true,
    },
  });

  console.log('Created tenant:', tenant.name);

  // Create the 6 AreLuna Group companies
  const companies = [
    {
      id: 'instituto-areluna',
      name: 'INSTITUTO ARELUNA MEDICINA DENTÁRIA AVANÇADA, LDA',
      code: 'IAMD',
      taxId: '516562240',
      address: 'Rua do Bacelo, nº 266, 4475-325 Milheirós - Maia',
      legalNature: 'Sociedade por Quotas',
      socialCapital: 50000.00,
      socialObject: 'Prestação de serviços médicos e dentários',
      management: 'Leonardo Costa Saraiva de Oliveira e Arethuza Carolina Brochado Luna',
      iban: 'PT50 0035 0196 00030120730 02',
      contributoryStatus: 'Regularizada junto da Segurança Social',
      tenantId: tenant.id,
    },
    {
      id: 'vespasian-ventures',
      name: 'SOCIEDADE DE GESTÃO VESPASIAN VENTURES, LDA',
      code: 'VV',
      taxId: '516313916',
      address: 'Rua de Júlio de Dinis, nº 194, 4050-027 Porto',
      legalNature: 'Sociedade por Quotas',
      socialCapital: 2250.00,
      socialObject: 'Consultoria, gestão, investimentos, turismo médico, arrendamento, consultório médico/dentário',
      management: 'Leonardo Costa Saraiva de Oliveira',
      shareholdings: 'Sócia de todas as empresas unipessoais do grupo',
      tenantId: tenant.id,
    },
    {
      id: 'prostoral',
      name: 'PROSTORAL LABORATÓRIO DE DISPOSITIVOS MÉDICOS, LDA',
      code: 'PLDM',
      taxId: '516681826',
      address: 'Rua do Bacelo, nº 266, 4475-325 Maia',
      legalNature: 'Sociedade por Quotas',
      socialCapital: 5000.00,
      socialObject: 'Fabricação de material ortopédico, próteses e equipamentos médico-cirúrgicos; arrendamento imobiliário',
      management: 'Leonardo Costa Saraiva de Oliveira',
      iban: 'PT50 0035 0196 00030191630 23',
      shareholdings: 'Sócia Única: Vespasian Ventures',
      tenantId: tenant.id,
    },
    {
      id: 'nuvens-autoctones',
      name: 'NUVENS AUTÓCTONES - UNIPESSOAL LDA',
      code: 'NA',
      taxId: '518881555',
      address: 'Rua de Faria Guimarães, nº 449, 4000-205 Porto',
      legalNature: 'Sociedade Unipessoal por Quotas',
      socialCapital: 75000.00,
      socialObject: 'Transporte rodoviário de mercadorias, logística, aluguer e manutenção de veículos',
      management: 'Leonardo Costa Saraiva de Oliveira',
      shareholdings: 'Sócia Única: Vespasian Ventures',
      tenantId: tenant.id,
    },
    {
      id: 'papagaio-fotogenico',
      name: 'PAPAGAIO FOTOGÉNICO - UNIPESSOAL LDA',
      code: 'PF',
      taxId: '518822532',
      address: 'Rua de Faria Guimarães, nº 449, 4000-205 Porto',
      legalNature: 'Sociedade Unipessoal por Quotas',
      socialCapital: 10000.00,
      socialObject: 'Produção audiovisual, atividades fotográficas, publicidade, representação, TI, criação artística/literária',
      management: 'Arethuza Carolina Brochado Luna',
      shareholdings: 'Sócia Única: Vespasian Ventures',
      tenantId: tenant.id,
    },
    {
      id: 'pinklegion',
      name: 'PINKLEGION - UNIPESSOAL LDA',
      code: 'PL',
      taxId: '518899586',
      address: 'Rua do Bacelo, nº 266, 4475-325 Maia',
      legalNature: 'Sociedade Unipessoal por Quotas',
      socialCapital: 80000.00,
      socialObject: 'Comércio e reparação de veículos, motociclos, embarcações e atividades financeiras auxiliares',
      management: 'Leonardo Costa Saraiva de Oliveira',
      shareholdings: 'Sócia Única: Vespasian Ventures',
      tenantId: tenant.id,
    },
  ];

  for (const companyData of companies) {
    const company = await prisma.company.upsert({
      where: { id: companyData.id },
      update: companyData,
      create: companyData,
    });
    console.log(`Created/Updated company: ${company.name}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });