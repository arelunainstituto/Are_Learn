// Application State
let appState = {
    emprestimos: [],
    pagamentos: [],
    configuracoes: {
        multa_percentual: 2,
        juros_mora_mensal: 1,
        dias_inadimplencia: 60,
        moeda: "EUR",
        timezone: "Europe/Lisbon"
    },
    currentSection: 'dashboard',
    editingLoanId: null,
    currentLanguage: 'pt'
};

// Internationalization System
const translations = {
    pt: {
        nav: {
            dashboard: "Dashboard",
            loans: "Empréstimos",
            payments: "Pagamentos",
            reports: "Relatórios"
        },
        dashboard: {
            title: "Dashboard",
            activePortfolio: "Carteira Ativa",
            defaultRate: "Taxa Inadimplência",
            receivedThisMonth: "Recebido Este Mês",
            forecast30d: "Previsão 30 dias",
            estimatedROI: "ROI Estimado",
            loans: "empréstimos",
            receivablesEvolution: "Evolução de Recebimentos",
            riskDistribution: "Distribuição por Score de Risco",
            loansTable: "Empréstimos",
            searchPlaceholder: "Buscar por cliente...",
            allStatuses: "Todos os status",
            allRisks: "Todos os riscos",
            allDelays: "Todos",
            noDelay: "Sem atraso",
            active: "Ativo",
            settled: "Liquidado",
            defaulting: "Em Incumprimento",
            numberOfLoans: "Número de Empréstimos"
        },
        loans: {
            title: "Gestão de Empréstimos",
            newLoan: "Novo Empréstimo",
            client: "Cliente",
            amount: "Montante",
            installments: "Parcelas",
            rate: "Taxa",
            status: "Status",
            startDate: "Data Início",
            actions: "Ações"
        },
        payments: {
            title: "Gestão de Pagamentos",
            newPayment: "Registrar Pagamento",
            loan: "Empréstimo",
            installment: "Parcela",
            amountPaid: "Valor Pago",
            paymentDate: "Data Pagamento",
            delay: "Atraso",
            fine: "Multa"
        },
        reports: {
            title: "Relatórios e Exportação",
            exportData: "Exportar Dados",
            reportType: "Tipo de Relatório",
            period: "Período",
            exportCSV: "Exportar CSV"
        },
        common: {
            save: "Salvar",
            cancel: "Cancelar",
            edit: "Editar",
            delete: "Excluir",
            close: "Fechar",
            actions: "Ações",
            id: "ID",
            segment: "Segmento",
            risk: "Risco",
            days: "dias",
            noDelay: "Sem atraso"
        }
    },
    en: {
        nav: {
            dashboard: "Dashboard",
            loans: "Loans",
            payments: "Payments",
            reports: "Reports"
        },
        dashboard: {
            title: "Dashboard",
            activePortfolio: "Active Portfolio",
            defaultRate: "Default Rate",
            receivedThisMonth: "Received This Month",
            forecast30d: "30-day Forecast",
            estimatedROI: "Estimated ROI",
            loans: "loans",
            receivablesEvolution: "Receivables Evolution",
            riskDistribution: "Risk Score Distribution",
            loansTable: "Loans",
            searchPlaceholder: "Search by client...",
            allStatuses: "All statuses",
            allRisks: "All risks",
            allDelays: "All",
            noDelay: "No delay",
            active: "Active",
            settled: "Settled",
            defaulting: "Defaulting",
            numberOfLoans: "Number of Loans"
        },
        loans: {
            title: "Loan Management",
            newLoan: "New Loan",
            client: "Client",
            amount: "Amount",
            installments: "Installments",
            rate: "Rate",
            status: "Status",
            startDate: "Start Date",
            actions: "Actions"
        },
        payments: {
            title: "Payment Management",
            newPayment: "Register Payment",
            loan: "Loan",
            installment: "Installment",
            amountPaid: "Amount Paid",
            paymentDate: "Payment Date",
            delay: "Delay",
            fine: "Fine"
        },
        reports: {
            title: "Reports and Export",
            exportData: "Export Data",
            reportType: "Report Type",
            period: "Period",
            exportCSV: "Export CSV"
        },
        common: {
            save: "Save",
            cancel: "Cancel",
            edit: "Edit",
            delete: "Delete",
            close: "Close",
            actions: "Actions",
            id: "ID",
            segment: "Segment",
            risk: "Risk",
            days: "days",
            noDelay: "No delay"
        }
    },
    de: {
        nav: {
            dashboard: "Dashboard",
            loans: "Darlehen",
            payments: "Zahlungen",
            reports: "Berichte"
        },
        dashboard: {
            title: "Dashboard",
            activePortfolio: "Aktives Portfolio",
            defaultRate: "Ausfallrate",
            receivedThisMonth: "Diesen Monat erhalten",
            forecast30d: "30-Tage-Prognose",
            estimatedROI: "Geschätzter ROI",
            loans: "Darlehen",
            receivablesEvolution: "Forderungsentwicklung",
            riskDistribution: "Risiko-Score-Verteilung",
            loansTable: "Darlehen",
            searchPlaceholder: "Nach Kunde suchen...",
            allStatuses: "Alle Status",
            allRisks: "Alle Risiken",
            allDelays: "Alle",
            noDelay: "Keine Verzögerung",
            active: "Aktiv",
            settled: "Beglichen",
            defaulting: "Zahlungsausfall",
            numberOfLoans: "Anzahl der Darlehen"
        },
        loans: {
            title: "Darlehen-Verwaltung",
            newLoan: "Neues Darlehen",
            client: "Kunde",
            amount: "Betrag",
            installments: "Raten",
            rate: "Zinssatz",
            status: "Status",
            startDate: "Startdatum",
            actions: "Aktionen"
        },
        payments: {
            title: "Zahlungs-Verwaltung",
            newPayment: "Zahlung registrieren",
            loan: "Darlehen",
            installment: "Rate",
            amountPaid: "Gezahlter Betrag",
            paymentDate: "Zahlungsdatum",
            delay: "Verzögerung",
            fine: "Strafe"
        },
        reports: {
            title: "Berichte und Export",
            exportData: "Daten exportieren",
            reportType: "Berichtstyp",
            period: "Zeitraum",
            exportCSV: "CSV exportieren"
        },
        common: {
            save: "Speichern",
            cancel: "Abbrechen",
            edit: "Bearbeiten",
            delete: "Löschen",
            close: "Schließen",
            actions: "Aktionen",
            id: "ID",
            segment: "Segment",
            risk: "Risiko",
            days: "Tage",
            noDelay: "Keine Verzögerung"
        }
    }
};

// Internationalization Functions
class I18n {
    static init() {
        // Load saved language or default to Portuguese
        const savedLang = localStorage.getItem('lending-platform-language') || 'pt';
        appState.currentLanguage = savedLang;
        
        // Set language selector
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = savedLang;
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
        
        this.updateInterface();
    }
    
    static setLanguage(lang) {
        appState.currentLanguage = lang;
        localStorage.setItem('lending-platform-language', lang);
        this.updateInterface();
        
        // Update charts and tables
        Dashboard.updateCharts();
        TableManager.renderLoansTable();
        LoanManager.renderEmprestimosTable();
        PaymentManager.renderPagamentosTable();
    }
    
    static t(key) {
        const keys = key.split('.');
        let value = translations[appState.currentLanguage];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        return value || key;
    }
    
    static updateInterface() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        // Update titles
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });
    }
}

// Seed Data - Based on provided JSON
const seedData = {
    emprestimos: [
        {"id": 1, "cliente": "João Silva", "segmento": "Pessoal", "montante": 10000, "data_inicio": "2024-01-15", "taxa_anual": 12, "n_parcelas": 12, "valor_parcela_1": 888.49, "valor_parcelas_restantes": 888.49, "score_risco": "B", "status": "ativo"},
        {"id": 2, "cliente": "Maria Santos", "segmento": "Imobiliário", "montante": 25000, "data_inicio": "2024-02-01", "taxa_anual": 8.5, "n_parcelas": 24, "valor_parcela_1": 1134.83, "valor_parcelas_restantes": 1134.83, "score_risco": "A", "status": "ativo"},
        {"id": 3, "cliente": "Tech Solutions Lda", "segmento": "Empresarial", "montante": 50000, "data_inicio": "2023-12-10", "taxa_anual": 15, "n_parcelas": 18, "valor_parcela_1": 3208.67, "valor_parcelas_restantes": 3208.67, "score_risco": "C", "status": "em_incumprimento"},
        {"id": 4, "cliente": "Ana Costa", "segmento": "Pessoal", "montante": 5000, "data_inicio": "2024-03-20", "taxa_anual": 10, "n_parcelas": 10, "valor_parcela_1": 527.30, "valor_parcelas_restantes": 527.30, "score_risco": "A", "status": "ativo"},
        {"id": 5, "cliente": "Carlos Fernandes", "segmento": "Pessoal", "montante": 15000, "data_inicio": "2023-11-05", "taxa_anual": 13.5, "n_parcelas": 15, "valor_parcela_1": 1130.89, "valor_parcelas_restantes": 1130.89, "score_risco": "B", "status": "liquidado"},
        {"id": 6, "cliente": "Restaurante Bom Sabor", "segmento": "Empresarial", "montante": 30000, "data_inicio": "2024-01-08", "taxa_anual": 14, "n_parcelas": 20, "valor_parcela_1": 1797.29, "valor_parcelas_restantes": 1797.29, "score_risco": "D", "status": "ativo"},
        {"id": 7, "cliente": "Sofia Oliveira", "segmento": "Imobiliário", "montante": 40000, "data_inicio": "2023-10-15", "taxa_anual": 9, "n_parcelas": 30, "valor_parcela_1": 1610.46, "valor_parcelas_restantes": 1610.46, "score_risco": "A", "status": "ativo"},
        {"id": 8, "cliente": "Pedro Almeida", "segmento": "Pessoal", "montante": 8000, "data_inicio": "2024-04-12", "taxa_anual": 11, "n_parcelas": 12, "valor_parcela_1": 704.45, "valor_parcelas_restantes": 704.45, "score_risco": "C", "status": "ativo"},
        {"id": 9, "cliente": "Loja do João", "segmento": "Empresarial", "montante": 20000, "data_inicio": "2023-09-30", "taxa_anual": 16, "n_parcelas": 16, "valor_parcela_1": 1479.38, "valor_parcelas_restantes": 1479.38, "score_risco": "E", "status": "em_incumprimento"},
        {"id": 10, "cliente": "Isabel Rodrigues", "segmento": "Pessoal", "montante": 12000, "data_inicio": "2024-02-28", "taxa_anual": 9.5, "n_parcelas": 14, "valor_parcela_1": 943.07, "valor_parcelas_restantes": 943.07, "score_risco": "A", "status": "ativo"},
        {"id": 11, "cliente": "Farmácia Central", "segmento": "Empresarial", "montante": 35000, "data_inicio": "2023-12-01", "taxa_anual": 12.5, "n_parcelas": 22, "valor_parcela_1": 1865.32, "valor_parcelas_restantes": 1865.32, "score_risco": "B", "status": "ativo"},
        {"id": 12, "cliente": "Rui Martins", "segmento": "Imobiliário", "montante": 60000, "data_inicio": "2023-08-20", "taxa_anual": 7.5, "n_parcelas": 36, "valor_parcela_1": 1935.22, "valor_parcelas_restantes": 1935.22, "score_risco": "A", "status": "liquidado"},
        {"id": 13, "cliente": "Helena Gomes", "segmento": "Pessoal", "montante": 7500, "data_inicio": "2024-05-10", "taxa_anual": 10.5, "n_parcelas": 11, "valor_parcela_1": 721.74, "valor_parcelas_restantes": 721.74, "score_risco": "B", "status": "ativo"},
        {"id": 14, "cliente": "Oficina Auto", "segmento": "Empresarial", "montante": 18000, "data_inicio": "2024-01-25", "taxa_anual": 13, "n_parcelas": 15, "valor_parcela_1": 1348.85, "valor_parcelas_restantes": 1348.85, "score_risco": "C", "status": "ativo"},
        {"id": 15, "cliente": "Catarina Lima", "segmento": "Pessoal", "montante": 9500, "data_inicio": "2023-11-18", "taxa_anual": 11.5, "n_parcelas": 13, "valor_parcela_1": 812.69, "valor_parcelas_restantes": 812.69, "score_risco": "B", "status": "liquidado"}
    ],
    pagamentos: [
        {"id": 1, "emprestimo_id": 1, "parcela_num": 1, "valor_pago": 888.49, "data_pagto": "2024-02-15", "dias_atraso": 0, "multa": 0, "juros_mora": 0},
        {"id": 2, "emprestimo_id": 1, "parcela_num": 2, "valor_pago": 888.49, "data_pagto": "2024-03-15", "dias_atraso": 0, "multa": 0, "juros_mora": 0},
        {"id": 3, "emprestimo_id": 1, "parcela_num": 3, "valor_pago": 888.49, "data_pagto": "2024-04-20", "dias_atraso": 5, "multa": 17.77, "juros_mora": 1.48},
        {"id": 4, "emprestimo_id": 2, "parcela_num": 1, "valor_pago": 1134.83, "data_pagto": "2024-03-01", "dias_atraso": 0, "multa": 0, "juros_mora": 0},
        {"id": 5, "emprestimo_id": 2, "parcela_num": 2, "valor_pago": 1134.83, "data_pagto": "2024-04-01", "dias_atraso": 0, "multa": 0, "juros_mora": 0},
        {"id": 6, "emprestimo_id": 3, "parcela_num": 1, "valor_pago": 3208.67, "data_pagto": "2024-01-10", "dias_atraso": 0, "multa": 0, "juros_mora": 0},
        {"id": 7, "emprestimo_id": 3, "parcela_num": 2, "valor_pago": 0, "data_pagto": null, "dias_atraso": 45, "multa": 64.17, "juros_mora": 48.13},
        {"id": 8, "emprestimo_id": 4, "parcela_num": 1, "valor_pago": 527.30, "data_pagto": "2024-04-20", "dias_atraso": 0, "multa": 0, "juros_mora": 0},
        {"id": 9, "emprestimo_id": 5, "parcela_num": 15, "valor_pago": 1130.89, "data_pagto": "2024-01-05", "dias_atraso": 0, "multa": 0, "juros_mora": 0},
        {"id": 10, "emprestimo_id": 6, "parcela_num": 1, "valor_pago": 1797.29, "data_pagto": "2024-02-08", "dias_atraso": 0, "multa": 0, "juros_mora": 0},
        {"id": 11, "emprestimo_id": 6, "parcela_num": 2, "valor_pago": 1500.00, "data_pagto": "2024-03-15", "dias_atraso": 7, "multa": 35.95, "juros_mora": 4.19},
        {"id": 12, "emprestimo_id": 9, "parcela_num": 1, "valor_pago": 0, "data_pagto": null, "dias_atraso": 90, "multa": 29.59, "juros_mora": 44.38}
    ]
};

// Financial Calculations
class FinancialCalculator {
    // Calculate monthly payment using annuity formula
    static calculateAnnuity(principal, annualRate, numPayments) {
        const monthlyRate = annualRate / 100 / 12;
        if (monthlyRate === 0) return principal / numPayments;
        
        const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                       (Math.pow(1 + monthlyRate, numPayments) - 1);
        return Math.round(payment * 100) / 100;
    }

    // Calculate IRR using iterative method
    static calculateIRR(cashFlows, guess = 0.1) {
        const maxIterations = 1000;
        const precision = 0.00001;
        let rate = guess;
        
        for (let i = 0; i < maxIterations; i++) {
            const npv = this.calculateNPV(cashFlows, rate);
            const derivative = this.calculateNPVDerivative(cashFlows, rate);
            
            if (Math.abs(npv) < precision) {
                return rate * 100; // Return as percentage
            }
            
            const newRate = rate - npv / derivative;
            if (Math.abs(newRate - rate) < precision) {
                return newRate * 100;
            }
            rate = newRate;
        }
        
        return null; // Failed to converge
    }

    static calculateNPV(cashFlows, rate) {
        return cashFlows.reduce((npv, cashFlow, index) => {
            return npv + cashFlow / Math.pow(1 + rate, index);
        }, 0);
    }

    static calculateNPVDerivative(cashFlows, rate) {
        return cashFlows.reduce((derivative, cashFlow, index) => {
            if (index === 0) return derivative;
            return derivative - (index * cashFlow) / Math.pow(1 + rate, index + 1);
        }, 0);
    }

    // Calculate delay penalty
    static calculateDelayPenalty(amount, days, penaltyRate, interestRate) {
        const penalty = amount * (penaltyRate / 100);
        const interest = amount * (interestRate / 100 / 30) * days;
        return {
            multa: Math.round(penalty * 100) / 100,
            juros_mora: Math.round(interest * 100) / 100
        };
    }

    // Calculate days between dates
    static daysBetween(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date(date1);
        const secondDate = new Date(date2);
        return Math.round(Math.abs((firstDate - secondDate) / oneDay));
    }
}

// Utility Functions
class Utils {
    static formatCurrency(amount, currency = 'EUR') {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    static formatDate(dateString) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('pt-PT');
    }

    static formatPercentage(value) {
        return `${(value || 0).toFixed(2)}%`;
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static generateId() {
        return Date.now() + Math.random();
    }
}

// Alert System
class AlertSystem {
    static show(message, type = 'info', duration = 5000) {
        const alertsContainer = document.getElementById('alerts-container');
        const alert = document.createElement('div');
        alert.className = `alert alert--${type}`;
        
        alert.innerHTML = `
            <i class="fas fa-${this.getIconForType(type)}"></i>
            <span>${message}</span>
        `;
        
        alertsContainer.appendChild(alert);
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, duration);
    }

    static getIconForType(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Dashboard Manager
class Dashboard {
    static charts = {};

    static updateKPIs() {
        const activeLoans = appState.emprestimos.filter(loan => loan.status === 'ativo');
        const defaultLoans = appState.emprestimos.filter(loan => loan.status === 'em_incumprimento');
        const totalActive = activeLoans.reduce((sum, loan) => sum + loan.montante, 0);
        const defaultRate = appState.emprestimos.length > 0 ? 
            (defaultLoans.length / appState.emprestimos.length) * 100 : 0;

        // Current month payments
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyPayments = appState.pagamentos.filter(payment => {
            if (!payment.data_pagto) return false;
            const paymentDate = new Date(payment.data_pagto);
            return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
        });
        const monthlyTotal = monthlyPayments.reduce((sum, payment) => sum + payment.valor_pago, 0);

        // 30-day forecast
        const forecast30d = activeLoans.reduce((sum, loan) => sum + loan.valor_parcela_1, 0);

        // Simple ROI calculation
        const totalInvested = appState.emprestimos.reduce((sum, loan) => sum + loan.montante, 0);
        const totalReceived = appState.pagamentos.reduce((sum, payment) => sum + payment.valor_pago, 0);
        const roi = totalInvested > 0 ? ((totalReceived - totalInvested) / totalInvested) * 100 : 0;

        // Update DOM
        document.getElementById('carteira-ativa-valor').textContent = Utils.formatCurrency(totalActive);
        document.getElementById('carteira-ativa-count').textContent = `${activeLoans.length} empréstimos`;
        document.getElementById('taxa-inadimplencia').textContent = Utils.formatPercentage(defaultRate);
        document.getElementById('recebido-mes').textContent = Utils.formatCurrency(monthlyTotal);
        document.getElementById('previsao-30d').textContent = Utils.formatCurrency(forecast30d);
        document.getElementById('roi-estimado').textContent = Utils.formatPercentage(roi);
    }

    static initializeCharts() {
        this.createReceivablesChart();
        this.createRiskChart();
    }

    static createReceivablesChart() {
        const ctx = document.getElementById('recebimentos-chart').getContext('2d');
        
        // Generate monthly data for last 12 months
        const months = [];
        const receivables = [];
        const currentDate = new Date();
        
        for (let i = 11; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            months.push(date.toLocaleDateString('pt-PT', { month: 'short', year: 'numeric' }));
            
            const monthPayments = appState.pagamentos.filter(payment => {
                if (!payment.data_pagto) return false;
                const paymentDate = new Date(payment.data_pagto);
                return paymentDate.getMonth() === date.getMonth() && 
                       paymentDate.getFullYear() === date.getFullYear();
            });
            
            const monthTotal = monthPayments.reduce((sum, payment) => sum + payment.valor_pago, 0);
            receivables.push(monthTotal);
        }

        this.charts.receivables = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: I18n.t('dashboard.receivablesEvolution') + ' (€)',
                    data: receivables,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return Utils.formatCurrency(value);
                            }
                        }
                    }
                }
            }
        });
    }

    static createRiskChart() {
        const ctx = document.getElementById('risco-chart').getContext('2d');
        
        const riskDistribution = { A: 0, B: 0, C: 0, D: 0, E: 0 };
        appState.emprestimos.forEach(loan => {
            riskDistribution[loan.score_risco]++;
        });

        this.charts.risk = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(riskDistribution),
                datasets: [{
                    label: I18n.t('dashboard.numberOfLoans'),
                    data: Object.values(riskDistribution),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    static updateCharts() {
        if (this.charts.receivables) {
            this.charts.receivables.destroy();
        }
        if (this.charts.risk) {
            this.charts.risk.destroy();
        }
        this.initializeCharts();
    }
}

// Table Manager
class TableManager {
    static currentSort = { column: null, direction: 'asc' };
    static currentFilters = {
        search: '',
        status: '',
        risco: '',
        atraso: ''
    };

    static renderLoansTable() {
        const tbody = document.getElementById('loans-table-body');
        const filteredLoans = this.applyFilters(appState.emprestimos);
        const sortedLoans = this.applySorting(filteredLoans);

        tbody.innerHTML = sortedLoans.map(loan => {
            const delay = this.calculateLoanDelay(loan);
            return `
                <tr>
                    <td>${loan.id}</td>
                    <td>${loan.cliente}</td>
                    <td>${loan.segmento}</td>
                    <td class="text-right">${Utils.formatCurrency(loan.montante)}</td>
                    <td class="text-right">${Utils.formatPercentage(loan.taxa_anual)}</td>
                    <td>
                        <span class="risk-badge risk-badge--${loan.score_risco}">${loan.score_risco}</span>
                    </td>
                    <td>
                        <span class="status-badge status-badge--${loan.status.replace('_', '-')}">${this.getStatusLabel(loan.status)}</span>
                    </td>
                    <td>
                        <span class="delay-badge delay-badge--${delay.class}">${delay.text}</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon btn-icon--primary" onclick="LoanManager.editLoan(${loan.id})" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon btn-icon--warning" onclick="PaymentManager.showPaymentModal(${loan.id})" title="Pagamento">
                                <i class="fas fa-credit-card"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    static calculateLoanDelay(loan) {
        const payments = appState.pagamentos.filter(p => p.emprestimo_id === loan.id);
        const maxDelay = Math.max(...payments.map(p => p.dias_atraso || 0), 0);
        
        if (maxDelay === 0) return { class: 'none', text: 'Sem atraso' };
        if (maxDelay <= 30) return { class: 'low', text: `${maxDelay} dias` };
        return { class: 'high', text: `${maxDelay} dias` };
    }

    static getStatusLabel(status) {
        const labels = {
            ativo: 'Ativo',
            liquidado: 'Liquidado',
            em_incumprimento: 'Incumprimento'
        };
        return labels[status] || status;
    }

    static applyFilters(loans) {
        return loans.filter(loan => {
            const searchMatch = !this.currentFilters.search || 
                loan.cliente.toLowerCase().includes(this.currentFilters.search.toLowerCase());
            const statusMatch = !this.currentFilters.status || loan.status === this.currentFilters.status;
            const riskMatch = !this.currentFilters.risco || loan.score_risco === this.currentFilters.risco;
            
            let delayMatch = true;
            if (this.currentFilters.atraso) {
                const delay = this.calculateLoanDelay(loan);
                const maxDelay = Math.max(...appState.pagamentos
                    .filter(p => p.emprestimo_id === loan.id)
                    .map(p => p.dias_atraso || 0), 0);
                
                switch (this.currentFilters.atraso) {
                    case '0':
                        delayMatch = maxDelay === 0;
                        break;
                    case '1-30':
                        delayMatch = maxDelay >= 1 && maxDelay <= 30;
                        break;
                    case '31-60':
                        delayMatch = maxDelay >= 31 && maxDelay <= 60;
                        break;
                    case '61+':
                        delayMatch = maxDelay >= 61;
                        break;
                }
            }

            return searchMatch && statusMatch && riskMatch && delayMatch;
        });
    }

    static applySorting(loans) {
        if (!this.currentSort.column) return loans;

        return [...loans].sort((a, b) => {
            let valueA = a[this.currentSort.column];
            let valueB = b[this.currentSort.column];

            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA < valueB) return this.currentSort.direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return this.currentSort.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    static initializeFilters() {
        const searchInput = document.getElementById('search-loans');
        const statusFilter = document.getElementById('status-filter');
        const riskFilter = document.getElementById('risco-filter');
        const delayFilter = document.getElementById('atraso-filter');

        // Verificar se os elementos existem antes de adicionar event listeners
        if (searchInput) {
            const debouncedSearch = Utils.debounce(() => {
                this.currentFilters.search = searchInput.value;
                this.renderLoansTable();
            }, 300);

            searchInput.addEventListener('input', debouncedSearch);
        }

        [statusFilter, riskFilter, delayFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => {
                    this.currentFilters.status = statusFilter ? statusFilter.value : '';
                    this.currentFilters.risco = riskFilter ? riskFilter.value : '';
                    this.currentFilters.atraso = delayFilter ? delayFilter.value : '';
                    this.renderLoansTable();
                });
            }
        });

        // Inicializar ordenação apenas se os elementos existirem
        this.initializeSorting();
    }

    static initializeSorting() {
        // Verificar se existem elementos th[data-sort] antes de tentar acessá-los
        const sortHeaders = document.querySelectorAll('th[data-sort]');
        
        if (sortHeaders.length === 0) {
            // Se não existem ainda, tentar novamente após um pequeno delay
            setTimeout(() => this.initializeSorting(), 100);
            return;
        }

        sortHeaders.forEach(th => {
            th.addEventListener('click', () => {
                const column = th.dataset.sort;
                if (this.currentSort.column === column) {
                    this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    this.currentSort.column = column;
                    this.currentSort.direction = 'asc';
                }

                // Update UI - verificar se os elementos existem
                const allSortHeaders = document.querySelectorAll('th[data-sort]');
                allSortHeaders.forEach(header => {
                    if (header && header.classList) {
                        header.classList.remove('asc', 'desc');
                    }
                });
                
                if (th && th.classList) {
                    th.classList.add(this.currentSort.direction);
                }

                this.renderLoansTable();
            });
        });
    }

    static getStatusLabel(status) {
        const labels = {
            ativo: 'Ativo',
            liquidado: 'Liquidado',
            em_incumprimento: 'Incumprimento'
        };
        return labels[status] || status;
    }

    static applyFilters(loans) {
        return loans.filter(loan => {
            const searchMatch = !this.currentFilters.search || 
                loan.cliente.toLowerCase().includes(this.currentFilters.search.toLowerCase());
            const statusMatch = !this.currentFilters.status || loan.status === this.currentFilters.status;
            const riskMatch = !this.currentFilters.risco || loan.score_risco === this.currentFilters.risco;
            
            let delayMatch = true;
            if (this.currentFilters.atraso) {
                const delay = this.calculateLoanDelay(loan);
                const maxDelay = Math.max(...appState.pagamentos
                    .filter(p => p.emprestimo_id === loan.id)
                    .map(p => p.dias_atraso || 0), 0);
                
                switch (this.currentFilters.atraso) {
                    case '0':
                        delayMatch = maxDelay === 0;
                        break;
                    case '1-30':
                        delayMatch = maxDelay >= 1 && maxDelay <= 30;
                        break;
                    case '31-60':
                        delayMatch = maxDelay >= 31 && maxDelay <= 60;
                        break;
                    case '61+':
                        delayMatch = maxDelay >= 61;
                        break;
                }
            }

            return searchMatch && statusMatch && riskMatch && delayMatch;
        });
    }

    static applySorting(loans) {
        if (!this.currentSort.column) return loans;

        return [...loans].sort((a, b) => {
            let valueA = a[this.currentSort.column];
            let valueB = b[this.currentSort.column];

            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA < valueB) return this.currentSort.direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return this.currentSort.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }
}

// Loan Management
class LoanManager {
    static showLoanModal(loanId = null) {
        appState.editingLoanId = loanId;
        const modal = document.getElementById('loan-modal');
        const title = document.getElementById('loan-modal-title');
        
        if (loanId) {
            title.textContent = 'Editar Empréstimo';
            this.populateForm(loanId);
        } else {
            title.textContent = 'Novo Empréstimo';
            this.clearForm();
        }
        
        modal.classList.remove('hidden');
        document.getElementById('loan-data-inicio').value = new Date().toISOString().split('T')[0];
    }

    static populateForm(loanId) {
        const loan = appState.emprestimos.find(l => l.id === loanId);
        if (!loan) return;

        document.getElementById('loan-cliente').value = loan.cliente;
        document.getElementById('loan-segmento').value = loan.segmento;
        document.getElementById('loan-montante').value = loan.montante;
        document.getElementById('loan-taxa').value = loan.taxa_anual;
        document.getElementById('loan-parcelas').value = loan.n_parcelas;
        document.getElementById('loan-risco').value = loan.score_risco;
        document.getElementById('loan-data-inicio').value = loan.data_inicio;
        
        this.updateCalculatedValues();
    }

    static clearForm() {
        document.getElementById('loan-form').reset();
        document.getElementById('loan-parcela-valor').value = '';
    }

    static updateCalculatedValues() {
        const montante = parseFloat(document.getElementById('loan-montante').value) || 0;
        const taxa = parseFloat(document.getElementById('loan-taxa').value) || 0;
        const parcelas = parseInt(document.getElementById('loan-parcelas').value) || 0;

        if (montante > 0 && taxa > 0 && parcelas > 0) {
            const parcelaValue = FinancialCalculator.calculateAnnuity(montante, taxa, parcelas);
            document.getElementById('loan-parcela-valor').value = Utils.formatCurrency(parcelaValue);
        } else {
            document.getElementById('loan-parcela-valor').value = '';
        }
    }

    static saveLoan(formData) {
        const montante = parseFloat(formData.montante);
        const taxa = parseFloat(formData.taxa);
        const parcelas = parseInt(formData.parcelas);
        const parcelaValue = FinancialCalculator.calculateAnnuity(montante, taxa, parcelas);

        const loanData = {
            cliente: formData.cliente,
            segmento: formData.segmento,
            montante: montante,
            data_inicio: formData.dataInicio,
            taxa_anual: taxa,
            n_parcelas: parcelas,
            valor_parcela_1: parcelaValue,
            valor_parcelas_restantes: parcelaValue,
            score_risco: formData.risco,
            status: 'ativo'
        };

        if (appState.editingLoanId) {
            const index = appState.emprestimos.findIndex(l => l.id === appState.editingLoanId);
            if (index !== -1) {
                appState.emprestimos[index] = { ...loanData, id: appState.editingLoanId };
                AlertSystem.show('Empréstimo atualizado com sucesso!', 'success');
            }
        } else {
            loanData.id = Utils.generateId();
            appState.emprestimos.push(loanData);
            AlertSystem.show('Empréstimo criado com sucesso!', 'success');
        }

        this.closeLoanModal();
        this.refreshData();
    }

    static editLoan(loanId) {
        this.showLoanModal(loanId);
    }

    static closeLoanModal() {
        document.getElementById('loan-modal').classList.add('hidden');
        appState.editingLoanId = null;
    }

    static refreshData() {
        Dashboard.updateKPIs();
        Dashboard.updateCharts();
        TableManager.renderLoansTable();
        this.renderEmprestimosTable();
        PaymentManager.populatePaymentLoanSelect();
        this.checkAlerts();
    }

    static renderEmprestimosTable() {
        const tbody = document.getElementById('emprestimos-table-body');
        tbody.innerHTML = appState.emprestimos.map(loan => `
            <tr>
                <td>${loan.cliente}</td>
                <td class="text-right">${Utils.formatCurrency(loan.montante)}</td>
                <td class="text-center">${loan.n_parcelas}</td>
                <td class="text-right">${Utils.formatPercentage(loan.taxa_anual)}</td>
                <td>
                    <span class="status-badge status-badge--${loan.status.replace('_', '-')}">${TableManager.getStatusLabel(loan.status)}</span>
                </td>
                <td>${Utils.formatDate(loan.data_inicio)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon btn-icon--primary" onclick="LoanManager.editLoan(${loan.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    static checkAlerts() {
        const overdueLoans = appState.emprestimos.filter(loan => {
            const payments = appState.pagamentos.filter(p => p.emprestimo_id === loan.id);
            const maxDelay = Math.max(...payments.map(p => p.dias_atraso || 0), 0);
            return maxDelay > 30 && loan.status === 'ativo';
        });

        if (overdueLoans.length > 0) {
            AlertSystem.show(`Atenção: ${overdueLoans.length} empréstimos com mais de 30 dias de atraso!`, 'warning', 10000);
        }
    }
}

// Payment Management
class PaymentManager {
    static showPaymentModal(loanId = null) {
        const modal = document.getElementById('payment-modal');
        this.populatePaymentLoanSelect();
        
        if (loanId) {
            document.getElementById('payment-emprestimo').value = loanId;
        }
        
        document.getElementById('payment-data').value = new Date().toISOString().split('T')[0];
        modal.classList.remove('hidden');
    }

    static populatePaymentLoanSelect() {
        const select = document.getElementById('payment-emprestimo');
        const activeLoans = appState.emprestimos.filter(loan => loan.status === 'ativo');
        
        select.innerHTML = '<option value="">Selecionar empréstimo...</option>' +
            activeLoans.map(loan => `
                <option value="${loan.id}">${loan.cliente} - ${Utils.formatCurrency(loan.montante)}</option>
            `).join('');
    }

    static savePayment(formData) {
        const loan = appState.emprestimos.find(l => l.id == formData.emprestimoId);
        if (!loan) return;

        const dataVencimento = this.calculateDueDate(loan, formData.parcela);
        const diasAtraso = Math.max(0, FinancialCalculator.daysBetween(formData.data, dataVencimento));
        
        let multa = 0;
        let jurosMora = 0;
        
        if (diasAtraso > 0) {
            const penalties = FinancialCalculator.calculateDelayPenalty(
                formData.valor, 
                diasAtraso, 
                appState.configuracoes.multa_percentual,
                appState.configuracoes.juros_mora_mensal
            );
            multa = penalties.multa;
            jurosMora = penalties.juros_mora;
        }

        const payment = {
            id: Utils.generateId(),
            emprestimo_id: parseInt(formData.emprestimoId),
            parcela_num: parseInt(formData.parcela),
            valor_pago: parseFloat(formData.valor),
            data_pagto: formData.data,
            dias_atraso: diasAtraso,
            multa: multa,
            juros_mora: jurosMora
        };

        appState.pagamentos.push(payment);
        
        // Update loan status if needed
        this.updateLoanStatus(loan.id);
        
        AlertSystem.show('Pagamento registrado com sucesso!', 'success');
        this.closePaymentModal();
        LoanManager.refreshData();
        this.renderPagamentosTable();
    }

    static calculateDueDate(loan, parcelaNum) {
        const startDate = new Date(loan.data_inicio);
        startDate.setMonth(startDate.getMonth() + parcelaNum);
        return startDate.toISOString().split('T')[0];
    }

    static updateLoanStatus(loanId) {
        const loan = appState.emprestimos.find(l => l.id === loanId);
        const payments = appState.pagamentos.filter(p => p.emprestimo_id === loanId);
        
        const maxDelay = Math.max(...payments.map(p => p.dias_atraso || 0), 0);
        const totalPaid = payments.reduce((sum, p) => sum + p.valor_pago, 0);
        const totalDue = loan.valor_parcela_1 * loan.n_parcelas;
        
        if (totalPaid >= totalDue) {
            loan.status = 'liquidado';
        } else if (maxDelay > appState.configuracoes.dias_inadimplencia) {
            loan.status = 'em_incumprimento';
        }
    }

    static closePaymentModal() {
        document.getElementById('payment-modal').classList.add('hidden');
        document.getElementById('payment-form').reset();
    }

    static renderPagamentosTable() {
        const tbody = document.getElementById('pagamentos-table-body');
        const paymentsWithLoans = appState.pagamentos.map(payment => {
            const loan = appState.emprestimos.find(l => l.id === payment.emprestimo_id);
            return { ...payment, loan };
        });

        tbody.innerHTML = paymentsWithLoans.map(payment => `
            <tr>
                <td>${payment.emprestimo_id}</td>
                <td>${payment.loan ? payment.loan.cliente : '-'}</td>
                <td class="text-center">${payment.parcela_num}</td>
                <td class="text-right">${Utils.formatCurrency(payment.valor_pago)}</td>
                <td>${Utils.formatDate(payment.data_pagto)}</td>
                <td class="text-center">
                    <span class="delay-badge delay-badge--${payment.dias_atraso === 0 ? 'none' : payment.dias_atraso <= 30 ? 'low' : 'high'}">
                        ${payment.dias_atraso} dias
                    </span>
                </td>
                <td class="text-right ${payment.multa > 0 ? 'text-warning' : ''}">${Utils.formatCurrency(payment.multa)}</td>
                <td>
                    <span class="status-badge status-badge--${payment.dias_atraso === 0 ? 'ativo' : 'incumprimento'}">
                        ${payment.dias_atraso === 0 ? 'Em dia' : 'Com atraso'}
                    </span>
                </td>
            </tr>
        `).join('');
    }
}

// Export Manager
class ExportManager {
    static exportToCSV() {
        const type = document.getElementById('export-type').value;
        const dateFrom = document.getElementById('export-date-from').value;
        const dateTo = document.getElementById('export-date-to').value;

        let data, filename, headers;

        switch (type) {
            case 'emprestimos':
                data = this.filterByDateRange(appState.emprestimos, 'data_inicio', dateFrom, dateTo);
                headers = ['ID', 'Cliente', 'Segmento', 'Montante', 'Taxa Anual', 'Parcelas', 'Score Risco', 'Status', 'Data Início'];
                filename = 'emprestimos.csv';
                break;
            case 'pagamentos':
                data = this.filterByDateRange(appState.pagamentos, 'data_pagto', dateFrom, dateTo);
                headers = ['ID', 'Empréstimo ID', 'Parcela', 'Valor Pago', 'Data Pagamento', 'Dias Atraso', 'Multa', 'Juros Mora'];
                filename = 'pagamentos.csv';
                break;
            case 'kpis':
                data = this.generateKPIsData();
                headers = ['Métrica', 'Valor'];
                filename = 'kpis.csv';
                break;
        }

        const csvContent = this.generateCSV(data, headers, type);
        this.downloadCSV(csvContent, filename);
        AlertSystem.show('Exportação realizada com sucesso!', 'success');
    }

    static filterByDateRange(data, dateField, dateFrom, dateTo) {
        if (!dateFrom && !dateTo) return data;
        
        return data.filter(item => {
            const itemDate = new Date(item[dateField]);
            if (isNaN(itemDate)) return true;
            
            const from = dateFrom ? new Date(dateFrom) : null;
            const to = dateTo ? new Date(dateTo) : null;
            
            if (from && itemDate < from) return false;
            if (to && itemDate > to) return false;
            
            return true;
        });
    }

    static generateKPIsData() {
        const activeLoans = appState.emprestimos.filter(loan => loan.status === 'ativo');
        const defaultLoans = appState.emprestimos.filter(loan => loan.status === 'em_incumprimento');
        const totalActive = activeLoans.reduce((sum, loan) => sum + loan.montante, 0);
        const defaultRate = appState.emprestimos.length > 0 ? 
            (defaultLoans.length / appState.emprestimos.length) * 100 : 0;

        return [
            { metrica: 'Carteira Ativa', valor: Utils.formatCurrency(totalActive) },
            { metrica: 'Número de Empréstimos Ativos', valor: activeLoans.length },
            { metrica: 'Taxa de Inadimplência', valor: Utils.formatPercentage(defaultRate) },
            { metrica: 'Total de Empréstimos', valor: appState.emprestimos.length }
        ];
    }

    static generateCSV(data, headers, type) {
        const csvHeaders = headers.join(';');
        const csvRows = data.map(item => {
            switch (type) {
                case 'emprestimos':
                    return [
                        item.id, item.cliente, item.segmento, item.montante, 
                        item.taxa_anual, item.n_parcelas, item.score_risco, 
                        item.status, item.data_inicio
                    ].join(';');
                case 'pagamentos':
                    return [
                        item.id, item.emprestimo_id, item.parcela_num, item.valor_pago,
                        item.data_pagto, item.dias_atraso, item.multa, item.juros_mora
                    ].join(';');
                case 'kpis':
                    return [item.metrica, item.valor].join(';');
            }
        });
        
        return [csvHeaders, ...csvRows].join('\n');
    }

    static downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Application Initialization and Event Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize internationalization system
    I18n.init();
    
    // Initialize app state with seed data
    appState.emprestimos = [...seedData.emprestimos];
    appState.pagamentos = [...seedData.pagamentos];
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize forms
    initializeForms();
    
    // Initialize dashboard
    Dashboard.updateKPIs();
    Dashboard.initializeCharts();
    
    // Initialize tables
    TableManager.initializeFilters();
    TableManager.renderLoansTable();
    LoanManager.renderEmprestimosTable();
    PaymentManager.renderPagamentosTable();
    
    // Check for alerts
    LoanManager.checkAlerts();
});

function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;
            
            // Update navigation
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update sections
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
            
            appState.currentSection = targetSection;
        });
    });
    
    // Initialize language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            I18n.setLanguage(e.target.value);
        });
    }
}

function initializeForms() {
    // Loan form
    const loanForm = document.getElementById('loan-form');
    const montanteInput = document.getElementById('loan-montante');
    const taxaInput = document.getElementById('loan-taxa');
    const parcelasInput = document.getElementById('loan-parcelas');
    
    [montanteInput, taxaInput, parcelasInput].forEach(input => {
        input.addEventListener('input', LoanManager.updateCalculatedValues);
    });
    
    loanForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            cliente: document.getElementById('loan-cliente').value,
            segmento: document.getElementById('loan-segmento').value,
            montante: document.getElementById('loan-montante').value,
            taxa: document.getElementById('loan-taxa').value,
            parcelas: document.getElementById('loan-parcelas').value,
            risco: document.getElementById('loan-risco').value,
            dataInicio: document.getElementById('loan-data-inicio').value
        };
        LoanManager.saveLoan(formData);
    });
    
    // Payment form
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            emprestimoId: document.getElementById('payment-emprestimo').value,
            parcela: document.getElementById('payment-parcela').value,
            valor: document.getElementById('payment-valor').value,
            data: document.getElementById('payment-data').value
        };
        PaymentManager.savePayment(formData);
    });
    
    // Modal controls
    document.getElementById('new-loan-btn').addEventListener('click', () => LoanManager.showLoanModal());
    document.getElementById('close-loan-modal').addEventListener('click', LoanManager.closeLoanModal);
    document.getElementById('cancel-loan-btn').addEventListener('click', LoanManager.closeLoanModal);
    
    document.getElementById('new-payment-btn').addEventListener('click', () => PaymentManager.showPaymentModal());
    document.getElementById('close-payment-modal').addEventListener('click', PaymentManager.closePaymentModal);
    document.getElementById('cancel-payment-btn').addEventListener('click', PaymentManager.closePaymentModal);
    
    // Export controls
    document.getElementById('export-csv-btn').addEventListener('click', ExportManager.exportToCSV);
    
    // Close modals on backdrop click
    document.querySelectorAll('.modal__backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.closest('.modal').classList.add('hidden');
            }
        });
    });
}