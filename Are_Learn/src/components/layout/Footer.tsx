import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-grey-900 text-grey-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                {/* Circular emblem with A pattern */}
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <span className="text-grey-900 font-brand font-bold text-sm">A</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-brand font-bold text-white leading-tight">
                  AreLuna
                </span>
                <span className="text-xs font-sans font-medium text-gold-400 -mt-1">
                  INNSiDE
                </span>
              </div>
            </Link>
            <p className="text-sm mb-4 text-grey-300">
              AreLuna INNSiDE - Instituto de Educação Corporativa de excelência para profissionais
              que buscam crescimento contínuo.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="text-white font-brand font-bold mb-4">Plataforma</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cursos" className="hover:text-primary-400 transition-colors">
                  Todos os Cursos
                </Link>
              </li>
              <li>
                <Link href="/instrutores" className="hover:text-primary-400 transition-colors">
                  Instrutores
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="hover:text-primary-400 transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="hover:text-primary-400 transition-colors">
                  Como Funciona
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-white font-brand font-bold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="hover:text-primary-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/corporativo" className="hover:text-primary-400 transition-colors">
                  Soluções Corporativas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-primary-400 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-brand font-bold mb-4">Fale Conosco</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contato@areluna.com.br"
                  className="hover:text-gold-400 transition-colors"
                >
                  contato@areluna.com.br
                </a>
              </li>
              <li>
                <p className="text-xs text-gray-400 mt-4">
                  Atendimento de Segunda a Sexta<br />
                  das 9h às 18h
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-grey-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>
              © {currentYear} AreLuna INNSiDE. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/termos" className="hover:text-gold-400 transition-colors">
                Termos de Uso
              </Link>
              <Link href="/privacidade" className="hover:text-gold-400 transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

