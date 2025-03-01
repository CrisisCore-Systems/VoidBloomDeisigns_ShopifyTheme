module.exports = {
    content: [
      './layout/*.liquid',
      './templates/**/*.liquid',
      './sections/**/*.liquid',
      './snippets/**/*.liquid',
      './assets/*.js'
    ],
    theme: {
      extend: {
        colors: {
          // VoidBloom core palette
          void: {
            DEFAULT: '#000000', // Deep Black
            dark: '#0D0D0D',
            light: '#1A1A1A',
          },
          neon: {
            pink: '#FF007F', // Electric Pink
            cyan: '#00FFFF', // Electric Cyan
            purple: '#9D00FF', // Neon Purple (accent)
            green: '#00FF66', // Neon Green (accent)
          },
          // UI states
          interactive: {
            DEFAULT: '#FF007F', // Neon Pink
            hover: '#FF2994',
            active: '#DD006D',
          },
          // Functional colors
          critical: '#FF3D71', // Error/critical state
          success: '#00FF66', // Success state
          warning: '#FFAA00', // Warning state
          info: '#00FFFF',    // Info state
        },
        fontFamily: {
          rajdhani: ['Rajdhani', 'sans-serif'],
          cyber: ['"Share Tech Mono"', 'monospace'],
          body: ['Rajdhani', 'sans-serif'],
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem',
          '6xl': '3.75rem',
        },
        boxShadow: {
          'neon-pink': '0 0 5px #FF007F, 0 0 10px #FF007F, 0 0 15px #FF007F',
          'neon-cyan': '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF',
          'neon-purple': '0 0 5px #9D00FF, 0 0 10px #9D00FF, 0 0 15px #9D00FF',
          'neon-green': '0 0 5px #00FF66, 0 0 10px #00FF66, 0 0 15px #00FF66',
        },
        backgroundImage: {
          'cyber-grid': 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
          'cyber-gradient': 'linear-gradient(135deg, #000000 0%, #1A1A1A 100%)',
          'neon-gradient': 'linear-gradient(135deg, #FF007F 0%, #9D00FF 50%, #00FFFF 100%)',
          'holographic': 'linear-gradient(135deg, #FF007F 0%, #9D00FF 25%, #00FFFF 50%, #00FF66 75%, #FF007F 100%)',
        },
        keyframes: {
          glitch: {
            '0%': { transform: 'translate(0)' },
            '20%': { transform: 'translate(-2px, 2px)' },
            '40%': { transform: 'translate(-2px, -2px)' },
            '60%': { transform: 'translate(2px, 2px)' },
            '80%': { transform: 'translate(2px, -2px)' },
            '100%': { transform: 'translate(0)' },
          },
          'neon-pulse': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.7' },
          },
          'void-float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          }
        },
        animation: {
          glitch: 'glitch 0.3s linear infinite',
          'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
          'void-float': 'void-float 6s ease-in-out infinite',
        },
        borderWidth: {
          '1': '1px',
        },
        backgroundSize: {
          'auto': 'auto',
          'cover': 'cover',
          'contain': 'contain',
          '10': '10px 10px',
          '20': '20px 20px',
          '30': '30px 30px',
        },
      },
    },
    plugins: [
      // Custom plugin for cyberpunk effects
      function({ addComponents }) {
        const components = {
          '.text-glitch': {
            position: 'relative',
            '&::before, &::after': {
              content: 'attr(data-text)',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            },
            '&::before': {
              left: '2px',
              textShadow: '-2px 0 #FF007F',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              animation: 'glitch 0.3s linear infinite',
              animationDelay: '0.1s',
            },
            '&::after': {
              left: '-2px',
              textShadow: '2px 0 #00FFFF',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              animation: 'glitch 0.3s linear infinite',
              animationDelay: '0.2s',
            },
          },
          '.text-neon-pink': {
            color: '#FF007F',
            textShadow: '0 0 5px #FF007F, 0 0 10px #FF007F',
          },
          '.text-neon-cyan': {
            color: '#00FFFF',
            textShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF',
          },
          '.text-neon-purple': {
            color: '#9D00FF',
            textShadow: '0 0 5px #9D00FF, 0 0 10px #9D00FF',
          },
          '.cyber-border': {
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              border: '1px solid #00FFFF',
              clipPath: 'polygon(0 10%, 10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%)',
              pointerEvents: 'none',
            }
          },
          '.cyber-box': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid #FF007F',
            boxShadow: '0 0 10px rgba(255, 0, 127, 0.5)',
            clipPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))',
          },
          '.holographic-text': {
            position: 'relative',
            color: 'transparent',
            backgroundImage: 'linear-gradient(90deg, #FF007F, #9D00FF, #00FFFF, #00FF66, #FF007F)',
            backgroundSize: '200% auto',
            backgroundClip: 'text',
            '-webkit-background-clip': 'text',
            animation: 'text-shine 3s linear infinite',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          },
          '@keyframes text-shine': {
            'from': {
              backgroundPosition: '0% center'
            },
            'to': {
              backgroundPosition: '200% center'
            }
          }
        };
        addComponents(components);
      },
    ],
  };