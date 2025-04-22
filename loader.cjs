(async () => {
    try {
      await import('./dist/index.js'); 
    } catch (err) {
      console.error("Failed to load ESM bundle:", err);
      process.exit(1);
    }
  })();
  