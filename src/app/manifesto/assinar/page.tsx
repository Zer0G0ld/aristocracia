// src/app/manifesto/assinar/page.tsx
'use client';

import styles from './page.module.css';
import { FileSignature, CheckCircle, Lock, User, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function AssinarPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    commitment: false,
    privacy: false
  });

  const [isSigned, setIsSigned] = useState(false);
  const [signature, setSignature] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignature(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.commitment && formData.privacy) {
      setIsSigned(true);
      // Aqui você enviaria os dados para um backend
      console.log('Assinatura enviada:', { ...formData, signature });
    }
  };

  const vows = [
    "Dedicar minha mente ao estudo",
    "Meu caráter à excelência", 
    "Minha vontade à ação",
    "Minha vida à reconstrução"
  ];

  return (
    <main className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span>ASSINATURA DO MANIFESTO</span>
            <div className={styles.heroDivider}></div>
          </div>
          
          <h1 className={styles.heroTitle}>
            Juramento de Compromisso
          </h1>
          
          <p className={styles.heroSubtitle}>
            Este não é apenas um formulário. É um pacto solene. Um compromisso público 
            com os princípios da reconstrução civilizacional.
          </p>
        </div>
      </section>

      {!isSigned ? (
        /* Formulário de Assinatura */
        <section className={styles.signatureForm}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <FileSignature size={40} className={styles.formIcon} />
              <h2 className={styles.formTitle}>Assinar Manifesto</h2>
              <p className={styles.formSubtitle}>
                Preencha os dados abaixo para formalizar sua adesão ao movimento
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Dados Pessoais */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>
                  <User size={20} />
                  Dados Pessoais
                </h3>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Juramento */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>
                  <FileSignature size={20} />
                  Juramento Solene
                </h3>
                
                <div className={styles.vowContainer}>
                  <p className={styles.vowIntro}>
                    Eu, abaixo-assinado, solenemente juro:
                  </p>
                  
                  {vows.map((vow, index) => (
                    <div key={index} className={styles.vowLine}>
                      <CheckCircle size={16} className={styles.vowIcon} />
                      <span className={styles.vowText}>{vow}</span>
                    </div>
                  ))}
                  
                  <p className={styles.vowConclusion}>
                    Até que o futuro glorioso seja presente e meu nome esteja entre os que ousaram construir.
                  </p>
                </div>

                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="commitment"
                    name="commitment"
                    checked={formData.commitment}
                    onChange={handleChange}
                    className={styles.checkbox}
                    required
                  />
                  <label htmlFor="commitment" className={styles.checkboxLabel}>
                    Confirmo minha adesão integral aos princípios do manifesto e assumo este juramento
                  </label>
                </div>
              </div>

              {/* Assinatura Digital */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>
                  <FileSignature size={20} />
                  Assinatura Digital
                </h3>
                
                <div className={styles.signatureField}>
                  <input
                    type="text"
                    value={signature}
                    onChange={handleSignatureChange}
                    className={styles.signatureInput}
                    placeholder="Digite seu nome completo como assinatura"
                    required
                  />
                  <div className={styles.signatureLine}></div>
                  <p className={styles.signatureLabel}>Assinatura Digital</p>
                </div>
              </div>

              {/* Privacidade e Termos */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>
                  <Lock size={20} />
                  Privacidade e Termos
                </h3>
                
                <div className={styles.privacyBox}>
                  <p className={styles.privacyText}>
                    Seus dados serão utilizados exclusivamente para fins de registro no movimento 
                    Hub Direitista. Não compartilharemos suas informações com terceiros. 
                    Você receberá comunicações sobre atividades do movimento e poderá cancelar 
                    sua participação a qualquer momento.
                  </p>
                </div>

                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className={styles.checkbox}
                    required
                  />
                  <label htmlFor="privacy" className={styles.checkboxLabel}>
                    Concordo com os termos de privacidade e confirmo que li o manifesto completo
                  </label>
                </div>
              </div>

              {/* Botão de Envio */}
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={!formData.name || !formData.email || !formData.commitment || !formData.privacy || !signature}
              >
                Assinar Manifesto
                <ArrowRight size={20} />
              </button>
            </form>

            <div className={styles.formFooter}>
              <p className={styles.footerText}>
                Ao assinar, você será redirecionado para o programa de formação inicial.
              </p>
              <Link href="/manifesto" className={styles.footerLink}>
                Ler manifesto completo antes de assinar
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* Confirmação de Assinatura */
        <section className={styles.confirmation}>
          <div className={styles.confirmationContent}>
            <div className={styles.confirmationIcon}>
              <CheckCircle size={64} />
              <div className={styles.confirmationGlow}></div>
            </div>
            
            <h2 className={styles.confirmationTitle}>
              Manifesto Assinado com Sucesso!
            </h2>
            
            <p className={styles.confirmationText}>
              Parabéns, <strong>{formData.name}</strong>! Você acaba de dar o primeiro passo 
              na jornada da reconstrução civilizacional. Seu compromisso foi registrado e 
              você agora faz parte do círculo de construtores do futuro glorioso.
            </p>
            
            <div className={styles.confirmationDetails}>
              <div className={styles.detailCard}>
                <h3 className={styles.detailTitle}>Próximos Passos</h3>
                <ul className={styles.detailList}>
                  <li>Verifique seu e-mail para confirmação</li>
                  <li>Acesse o programa de formação inicial</li>
                  <li>Participe do fórum de discussões</li>
                  <li>Conheça outros membros da comunidade</li>
                </ul>
              </div>
              
              <div className={styles.detailCard}>
                <h3 className={styles.detailTitle}>Seu Compromisso</h3>
                <div className={styles.commitmentBox}>
                  <p className={styles.commitmentText}>
                    "{vows[0]}, {vows[1].toLowerCase()}, {vows[2].toLowerCase()} e {vows[3].toLowerCase()}"
                  </p>
                  <p className={styles.commitmentSignature}>
                    — {formData.name}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={styles.confirmationActions}>
              <Link href="/formacao/iniciar" className={styles.actionButtonPrimary}>
                Iniciar Formação
                <ArrowRight size={20} />
              </Link>
              <Link href="/comunidade" className={styles.actionButtonSecondary}>
                Conhecer a Comunidade
              </Link>
              <Link href="/manifesto" className={styles.actionButtonTertiary}>
                Voltar ao Manifesto
              </Link>
            </div>
            
            <div className={styles.confirmationNote}>
              <p>
                <strong>Nota:</strong> Um membro da nossa equipe entrará em contato em até 48 horas 
                para dar as boas-vindas pessoalmente e orientar seus primeiros passos.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}