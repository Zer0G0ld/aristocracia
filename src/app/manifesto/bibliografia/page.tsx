// src/app/manifesto/bibliografia/page.tsx
import styles from './page.module.css';
import { Book, BookOpen, FileText, Scroll, Download, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function BibliografiaPage() {
    const categories = [
        {
            title: "Filosofia Clássica",
            icon: <Scroll size={24} />,
            books: [
                {
                    title: "A República",
                    author: "Platão",
                    description: "Fundamentos da filosofia política e teoria das ideias",
                    level: "Fundamental",
                    pages: 416
                },
                {
                    title: "Ética a Nicômaco",
                    author: "Aristóteles",
                    description: "Tratado sobre virtude, felicidade e a vida boa",
                    level: "Fundamental",
                    pages: 352
                },
                {
                    title: "Meditações",
                    author: "Marco Aurélio",
                    description: "Reflexões estoicas sobre virtude e dever",
                    level: "Intermediário",
                    pages: 256
                }
            ]
        },
        {
            title: "Filosofia Política",
            icon: <Book size={24} />,
            books: [
                {
                    title: "Reflexões sobre a Revolução na França",
                    author: "Edmund Burke",
                    description: "Crítica do radicalismo revolucionário",
                    level: "Fundamental",
                    pages: 320
                },
                {
                    title: "O Conceito do Político",
                    author: "Carl Schmitt",
                    description: "Análise da distinção amigo-inimigo",
                    level: "Avançado",
                    pages: 128
                },
                {
                    title: "A Rebelião das Massas",
                    author: "José Ortega y Gasset",
                    description: "Crítica da sociedade de massas",
                    level: "Intermediário",
                    pages: 240
                }
            ]
        },
        {
            title: "Filosofia da História",
            icon: <FileText size={24} />,
            books: [
                {
                    title: "A Nova Ciência",
                    author: "Giambattista Vico",
                    description: "Ciclos históricos e desenvolvimento civilizacional",
                    level: "Avançado",
                    pages: 480
                },
                {
                    title: "Ordem e História",
                    author: "Eric Voegelin",
                    description: "Análise da experiência transcendental na história",
                    level: "Avançado",
                    pages: 320
                }
            ]
        },
        {
            title: "Tradição e Crítica Cultural",
            icon: <BookOpen size={24} />,
            books: [
                {
                    title: "Caminhos e Descaminhos da Modernidade",
                    author: "Roger Scruton",
                    description: "Defesa da tradição contra o radicalismo moderno",
                    level: "Intermediário",
                    pages: 288
                },
                {
                    title: "Revolta Contra o Mundo Moderno",
                    author: "Julius Evola",
                    description: "Crítica radical da modernidade",
                    level: "Avançado",
                    pages: 384
                }
            ]
        }
    ];

    const readingPlan = [
        {
            month: "Mês 1",
            focus: "Fundamentos",
            books: ["A República", "Ética a Nicômaco"],
            hours: "40h"
        },
        {
            month: "Mês 2",
            focus: "Política Clássica",
            books: ["Reflexões sobre a Revolução na França"],
            hours: "30h"
        },
        {
            month: "Mês 3",
            focus: "Crítica Cultural",
            books: ["A Rebelião das Massas", "Caminhos e Descaminhos da Modernidade"],
            hours: "50h"
        },
        {
            month: "Mês 4-6",
            focus: "Aprofundamento",
            books: ["O Conceito do Político", "Meditações"],
            hours: "80h"
        }
    ];

    return (
        <main className={styles.container}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <span>BIBLIOTECA FUNDAMENTAL</span>
                        <div className={styles.heroDivider}></div>
                    </div>

                    <h1 className={styles.heroTitle}>
                        A Arte da Leitura
                    </h1>

                    <p className={styles.heroSubtitle}>
                        Um intelectual é definido por sua biblioteca. Aqui estão os livros que formam
                        a base do pensamento direitista e da reconstrução civilizacional.
                    </p>

                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>12</span>
                            <span className={styles.statLabel}>Obras Essenciais</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>4</span>
                            <span className={styles.statLabel}>Categorias</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>200+</span>
                            <span className={styles.statLabel}>Horas de Estudo</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className={styles.categories}>
                <div className={styles.sectionHeader}>
                    <Filter size={32} className={styles.sectionIcon} />
                    <h2 className={styles.sectionTitle}>Categorias de Estudo</h2>
                    <p className={styles.sectionSubtitle}>
                        Organização temática para estudo progressivo e sistemático
                    </p>
                </div>

                <div className={styles.categoriesGrid}>
                    {categories.map((category, index) => (
                        <div key={index} className={styles.categoryCard}>
                            <div className={styles.categoryHeader}>
                                <div className={styles.categoryIcon}>
                                    {category.icon}
                                </div>
                                <h3 className={styles.categoryTitle}>{category.title}</h3>
                            </div>

                            <div className={styles.booksList}>
                                {category.books.map((book, idx) => (
                                    <div key={idx} className={styles.bookCard}>
                                        <div className={styles.bookHeader}>
                                            <h4 className={styles.bookTitle}>{book.title}</h4>
                                            <span className={styles.bookLevel}>{book.level}</span>
                                        </div>

                                        <p className={styles.bookAuthor}>{book.author}</p>
                                        <p className={styles.bookDescription}>{book.description}</p>

                                        <div className={styles.bookFooter}>
                                            <span className={styles.bookPages}>{book.pages} páginas</span>
                                            <button className={styles.bookButton}>
                                                <Download size={16} />
                                                PDF
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.categoryBorder}></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reading Plan */}
            <section className={styles.plan}>
                <div className={styles.sectionHeader}>
                    <BookOpen size={32} className={styles.sectionIcon} />
                    <h2 className={styles.sectionTitle}>Plano de Leitura Guiada</h2>
                    <p className={styles.sectionSubtitle}>
                        Sequência estruturada para desenvolvimento intelectual progressivo
                    </p>
                </div>

                <div className={styles.planTimeline}>
                    {readingPlan.map((phase, index) => (
                        <div key={index} className={styles.planPhase}>
                            <div className={styles.phaseHeader}>
                                <div className={styles.phaseMonth}>{phase.month}</div>
                                <div className={styles.phaseHours}>{phase.hours}</div>
                            </div>

                            <h3 className={styles.phaseFocus}>{phase.focus}</h3>

                            <div className={styles.phaseBooks}>
                                {phase.books.map((book, idx) => (
                                    <div key={idx} className={styles.phaseBook}>
                                        <div className={styles.bookBullet}></div>
                                        {book}
                                    </div>
                                ))}
                            </div>

                            <div className={styles.phaseBorder}></div>

                            {index < readingPlan.length - 1 && (
                                <div className={styles.planConnector}>
                                    <div className={styles.connectorLine}></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Methodology */}
            <section className={styles.methodology}>
                <div className={styles.methodContent}>
                    <h2 className={styles.methodTitle}>Método de Leitura Ativa</h2>

                    <div className={styles.methodSteps}>
                        <div className={styles.methodStep}>
                            <div className={styles.stepNumber}>1</div>
                            <h3 className={styles.stepTitle}>Leitura Anotada</h3>
                            <p className={styles.stepDescription}>
                                Sublinhar, fazer anotações nas margens, identificar conceitos-chave
                            </p>
                        </div>

                        <div className={styles.methodStep}>
                            <div className={styles.stepNumber}>2</div>
                            <h3 className={styles.stepTitle}>Resumo por Capítulo</h3>
                            <p className={styles.stepDescription}>
                                Escrever resumo de cada capítulo com suas próprias palavras
                            </p>
                        </div>

                        <div className={styles.methodStep}>
                            <div className={styles.stepNumber}>3</div>
                            <h3 className={styles.stepTitle}>Reflexão Crítica</h3>
                            <p className={styles.stepDescription}>
                                Questionar, concordar ou discordar, aplicar à realidade atual
                            </p>
                        </div>

                        <div className={styles.methodStep}>
                            <div className={styles.stepNumber}>4</div>
                            <h3 className={styles.stepTitle}>Síntese Final</h3>
                            <p className={styles.stepDescription}>
                                Criar ensaio sintetizando as principais ideias e aplicações
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        {/* CTA */ }
        <section className={styles.cta}>
            <div className={styles.ctaContent}>
                <div className={styles.ctaIcon}>
                    <BookOpen size={48} />
                </div>

                <h2 className={styles.ctaTitle}>Comece Sua Jornada Intelectual</h2>
                <p className={styles.ctaText}>
                    A verdadeira formação começa na biblioteca. Baixe nossa biblioteca completa
                    e inicie seu programa de estudos hoje mesmo.
                </p>

                <div className={styles.ctaButtons}>
                    <button className={styles.ctaButtonPrimary}>
                        <Download size={20} />
                        Baixar Biblioteca Completa
                    </button>
                    <Link href="/formacao/iniciar" className={styles.ctaButtonSecondary}>
                        Iniciar Programa de Estudos
                    </Link>
                </div>

                <div className={styles.ctaNote}>
                    <p>
                        <strong>Nota:</strong> Todas as obras estão disponíveis em domínio público
                        ou com permissão dos autores. Apoiamos a livre circulação do conhecimento.
                    </p>
                </div>
            </div>
        </section>
    </main>
  );
}