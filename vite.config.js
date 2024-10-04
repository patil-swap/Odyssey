import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
const __dirname = path.dirname("./src");

export default defineConfig({
  plugins: [react(), commonjs()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
