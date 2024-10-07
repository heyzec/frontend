{
  description = "Template for a direnv shell, with NodeJS";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/24.05";
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in
  {
    devShells.${system}.default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs_20
        yarn
      ];
    };
  };
}


