import { createNoopProphetWorkspaceHooks } from "./src/hooks.js";

const prophetWorkspacePlugin = {
  id: "prophet-workspace",
  name: "Prophet Workspace",
  description:
    "Narrow-waist integration point for Prophet workspace, policy, provenance, and connected-app flows.",
  configSchema: {
    parse(value: unknown) {
      const raw = value && typeof value === "object" && !Array.isArray(value)
        ? (value as Record<string, unknown>)
        : {};
      return {
        enabled: typeof raw.enabled === "boolean" ? raw.enabled : true,
        endpoint: typeof raw.endpoint === "string" ? raw.endpoint : undefined,
        authMode:
          raw.authMode === "token" || raw.authMode === "oauth" || raw.authMode === "none"
            ? raw.authMode
            : "none",
        tokenEnv: typeof raw.tokenEnv === "string" ? raw.tokenEnv : undefined,
        workspaceScope:
          typeof raw.workspaceScope === "string" ? raw.workspaceScope : undefined,
      };
    },
    uiHints: {
      enabled: { label: "Enabled" },
      endpoint: { label: "Prophet Endpoint", placeholder: "http://127.0.0.1:8787" },
      authMode: { label: "Auth Mode" },
      tokenEnv: { label: "Token Environment Variable", advanced: true },
      workspaceScope: { label: "Workspace Scope", advanced: true },
    },
  },
  register(api: any) {
    const config = this.configSchema.parse(api.pluginConfig);
    const hooks = createNoopProphetWorkspaceHooks(api);

    api.registerGatewayMethod("prophetWorkspace.status", ({ respond }: any) => {
      respond(true, {
        ok: true,
        plugin: "prophet-workspace",
        enabled: config.enabled,
        endpoint: config.endpoint ?? null,
        authMode: config.authMode,
        workspaceScope: config.workspaceScope ?? null,
        phase: "hook-rpc",
        hooks: [
          "emitCarrier",
          "evaluateMembraneDecision",
          "appendLedgerEvent",
          "resolveConnectedAppGrant",
        ],
      });
    });

    api.registerGatewayMethod("prophetWorkspace.emitCarrier", async ({ params, respond }: any) => {
      try {
        const result = await hooks.emitCarrier({
          kind: typeof params?.kind === "string" ? params.kind : "unknown",
          scope: typeof params?.scope === "string" ? params.scope : undefined,
          payload: params?.payload ?? {},
        });
        respond(true, result);
      } catch (err) {
        respond(false, { error: err instanceof Error ? err.message : String(err) });
      }
    });

    api.registerGatewayMethod(
      "prophetWorkspace.evaluateMembraneDecision",
      async ({ params, respond }: any) => {
        try {
          const result = await hooks.evaluateMembraneDecision({
            action: typeof params?.action === "string" ? params.action : "unknown",
            resource: typeof params?.resource === "string" ? params.resource : undefined,
            scope: typeof params?.scope === "string" ? params.scope : undefined,
            payload: params?.payload,
          });
          respond(true, result);
        } catch (err) {
          respond(false, { error: err instanceof Error ? err.message : String(err) });
        }
      },
    );

    api.registerGatewayMethod("prophetWorkspace.appendLedgerEvent", async ({ params, respond }: any) => {
      try {
        const result = await hooks.appendLedgerEvent({
          kind: typeof params?.kind === "string" ? params.kind : "unknown",
          scope: typeof params?.scope === "string" ? params.scope : undefined,
          payload: params?.payload ?? {},
        });
        respond(true, result);
      } catch (err) {
        respond(false, { error: err instanceof Error ? err.message : String(err) });
      }
    });

    api.registerGatewayMethod(
      "prophetWorkspace.resolveConnectedAppGrant",
      async ({ params, respond }: any) => {
        try {
          const scope = typeof params?.scope === "string" ? params.scope : "default";
          const result = await hooks.resolveConnectedAppGrant(scope);
          respond(true, result);
        } catch (err) {
          respond(false, { error: err instanceof Error ? err.message : String(err) });
        }
      },
    );

    api.registerCli(
      ({ program }: any) => {
        program
          .command("prophet-workspace-status")
          .description("Show Prophet workspace plugin status")
          .action(() => {
            api.logger.info(
              `[prophet-workspace] enabled=${String(config.enabled)} endpoint=${config.endpoint ?? "unset"} auth=${config.authMode}`,
            );
          });
      },
      { commands: ["prophet-workspace-status"] },
    );

    api.registerService({
      id: "prophet-workspace",
      start: async () => {
        api.logger.info("[prophet-workspace] hook-rpc plugin ready");
      },
      stop: async () => {
        api.logger.info("[prophet-workspace] hook-rpc plugin stopped");
      },
    });
  },
};

export default prophetWorkspacePlugin;
