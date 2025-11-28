import React from 'react';
import styled from 'styled-components';

/**
 * Logo Component - Instituto Areluna
 * 
 * Componente reutilizável para aplicação consistente da marca
 * em todos os projetos digitais.
 * 
 * @example
 * // Logo horizontal em fundo claro
 * <Logo variant="horizontal" background="light" />
 * 
 * // Apenas ícone em fundo escuro
 * <Logo variant="icon" background="dark" size="sm" />
 */

export type LogoVariant = 'horizontal' | 'icon' | 'academy' | 'instituto';
export type LogoBackground = 'light' | 'dark' | 'marmore' | 'transparent';
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface LogoProps {
  /** Variante do logo a ser exibida */
  variant?: LogoVariant;
  /** Tipo de fundo onde o logo será aplicado */
  background?: LogoBackground;
  /** Tamanho do logo */
  size?: LogoSize;
  /** Classe CSS adicional */
  className?: string;
  /** Largura customizada (sobrescreve size) */
  width?: string | number;
  /** Altura customizada (sobrescreve size) */
  height?: string | number;
  /** Alt text para acessibilidade */
  alt?: string;
  /** Ação ao clicar no logo */
  onClick?: () => void;
}

const sizeMap: Record<LogoSize, string> = {
  xs: '80px',
  sm: '120px',
  md: '180px',
  lg: '240px',
  xl: '320px',
  '2xl': '400px',
};

const LogoContainer = styled.div<{ 
  $size: string; 
  $width?: string | number; 
  $height?: string | number;
  $clickable: boolean;
}>`
  display: inline-block;
  width: ${props => props.$width || props.$size};
  height: ${props => props.$height || 'auto'};
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  ${props => props.$clickable && `
    &:hover {
      opacity: 0.85;
      transform: scale(1.02);
    }
    
    &:active {
      transform: scale(0.98);
    }
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/**
 * Retorna o caminho do asset baseado na variante e fundo
 * 
 * NOTA: Substitua os caminhos pelos assets reais da pasta Projects_Branding/
 */
const getLogoPath = (
  variant: LogoVariant,
  background: LogoBackground
): string => {
  // TODO: Substituir pelos caminhos reais dos assets
  const basePath = '/Projects_Branding/Logos';
  
  // Determinar se deve usar versão dourada, preta ou branca
  const colorVersion = background === 'light' 
    ? 'dourado' 
    : background === 'dark' 
      ? 'branco' 
      : 'dourado';

  switch (variant) {
    case 'instituto':
      return background === 'dark'
        ? `${basePath}/Instituto Areluna/PNG/Instituto Areluna- Dourado Fundo Preto.png`
        : `${basePath}/Instituto Areluna/PNG/Instituto Areluna- Dourado Fundo Branco.png`;
        
    case 'horizontal':
      return background === 'dark'
        ? `${basePath}/Instituto Areluna/PNG/Instituto Areluna- Dourado Fundo Preto.png`
        : `${basePath}/Instituto Areluna/PNG/Instituto Areluna- Dourado Fundo Branco.png`;
        
    case 'icon':
      return background === 'dark'
        ? `${basePath}/Símbolo/PNG/Branco - Dourado.png`
        : `${basePath}/Símbolo/PNG/Preto - Dourado.png`;
        
    case 'academy':
      return background === 'dark'
        ? `${basePath}/Academy Areluna/PNG/Academy Areluna - Dourado Fundo Preto.png`
        : `${basePath}/Academy Areluna/PNG/Academy Areluna- Dourado Fundo Branco.png`;
        
    default:
      return `${basePath}/Instituto Areluna/PNG/Instituto Areluna- Dourado Fundo Branco.png`;
  }
};

/**
 * Retorna o alt text baseado na variante
 */
const getAltText = (variant: LogoVariant): string => {
  switch (variant) {
    case 'instituto':
    case 'horizontal':
      return 'Instituto Areluna - Medicina Dentária & Estética Avançada';
    case 'icon':
      return 'Areluna - Símbolo';
    case 'academy':
      return 'Academy Areluna';
    default:
      return 'Instituto Areluna';
  }
};

/**
 * Componente Logo do Instituto Areluna
 * 
 * Suporte para 4 variantes principais:
 * - horizontal: Logo completo horizontal
 * - icon: Apenas o símbolo circular
 * - academy: Sub-marca Academy Areluna
 * - instituto: Logo institucional completo
 * 
 * Backgrounds suportados:
 * - light: Fundo claro (usa versão dourada)
 * - dark: Fundo escuro (usa versão branca)
 * - marmore: Fundo mármore (usa versão dourada)
 * - transparent: Fundo transparente
 */
const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  background = 'light',
  size = 'md',
  className,
  width,
  height,
  alt,
  onClick
}) => {
  const src = getLogoPath(variant, background);
  const altText = alt || getAltText(variant);
  const sizeValue = sizeMap[size];

  return (
    <LogoContainer
      $size={sizeValue}
      $width={width}
      $height={height}
      $clickable={!!onClick}
      className={className}
      onClick={onClick}
    >
      <img
        src={src}
        alt={altText}
        loading="lazy"
      />
    </LogoContainer>
  );
};

export default Logo;

// Exports para uso em outros componentes
export { Logo };
export type { LogoProps, LogoVariant, LogoBackground, LogoSize };
