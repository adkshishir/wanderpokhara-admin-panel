module.exports = {
  apps: [
    {
      name: "admin.wanderpokhara",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 4002
      }
    }
  ]
};
