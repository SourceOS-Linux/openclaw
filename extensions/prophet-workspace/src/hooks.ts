import type {
  ProphetCarrierEmitRequest,
  ProphetCarrierEmitResult,
  ProphetConnectedAppGrantResult,
  ProphetLedgerAppendRequest,
  ProphetLedgerAppendResult,
  ProphetMembraneDecisionRequest,
  ProphetMembraneDecisionResult,
  ProphetWorkspaceHooks,
} from "./contracts.js";

export function createNoopProphetWorkspaceHooks(api: any): ProphetWorkspaceHooks {
  return {
    async emitCarrier(request: ProphetCarrierEmitRequest): Promise<ProphetCarrierEmitResult> {
      api.logger.info(
        `[prophet-workspace] emitCarrier noop kind=${request.kind} scope=${request.scope ?? "none"}`,
      );
      return {
        accepted: false,
        carrierId: null,
        reason: "not-wired",
      };
    },

    async evaluateMembraneDecision(
      request: ProphetMembraneDecisionRequest,
    ): Promise<ProphetMembraneDecisionResult> {
      api.logger.info(
        `[prophet-workspace] evaluateMembraneDecision noop action=${request.action} resource=${request.resource ?? "none"}`,
      );
      return {
        allow: false,
        decisionId: null,
        reason: "not-wired",
        dangerClass: null,
      };
    },

    async appendLedgerEvent(
      request: ProphetLedgerAppendRequest,
    ): Promise<ProphetLedgerAppendResult> {
      api.logger.info(
        `[prophet-workspace] appendLedgerEvent noop kind=${request.kind} scope=${request.scope ?? "none"}`,
      );
      return {
        ok: false,
        entryId: null,
        reason: "not-wired",
      };
    },

    async resolveConnectedAppGrant(scope: string): Promise<ProphetConnectedAppGrantResult> {
      api.logger.info(`[prophet-workspace] resolveConnectedAppGrant noop scope=${scope}`);
      return {
        granted: false,
        grantId: null,
        reason: "not-wired",
      };
    },
  };
}
