{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.openssl_3

  ];
  idx.extensions = [
    
  
 "bradlc.vscode-tailwindcss"
 "dsznajder.es7-react-js-snippets"
 "Prisma.prisma"];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}