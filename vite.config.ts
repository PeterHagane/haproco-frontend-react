import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const plugins = [react(), TanStackRouterVite()]

  const environmentVars = {
    'process.env.API_URI': JSON.stringify(env.API_URI),
    'process.env.APP_IS_DEV': JSON.stringify(env.APP_IS_DEV),
    'process.env.API_KEY': JSON.stringify(env.API_KEY),
    'process.env.API_PASSWORD': JSON.stringify(env.API_PASSWORD)
  }

  const port =  env.APP_IS_DEV === "true" ? 5173 : 5173;

  return {
    define: environmentVars,
    plugins: plugins,
    server: {
      port: port
    }
    }
  }
)
