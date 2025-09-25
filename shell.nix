# stolen from https://github.com/tgirlcloud/nix-templates/blob/main/node/shell.nix
{
  mkShellNoCC,

  # extra tooling
  eslint_d,
  prettierd,
  just,
  fastmod,
  nodejs,
  yarn,
  crowdin-cli,
  typescript,
  typescript-language-server,
  go,

  callPackage,
}:
let
  defaultPackage = callPackage ./default.nix { };
in
mkShellNoCC {
  inputsFrom = [ defaultPackage ];

  packages = [
    eslint_d
    prettierd
    just
    fastmod
    nodejs
    yarn
    crowdin-cli
    typescript
    typescript-language-server
    go
  ];

  shellHook = ''
    eslint_d start # start eslint daemon
    eslint_d status # inform user about eslint daemon status
  '';
}
