export type ProphetCarrierEmitRequest = {
  kind: string;
  scope?: string;
  payload: unknown;
};

export type ProphetCarrierEmitResult = {
  accepted: boolean;
  carrierId?: string | null;
  reason?: string | null;
};

export type ProphetMembraneDecisionRequest = {
  action: string;
  resource?: string;
  scope?: string;
  payload?: unknown;
};

export type ProphetMembraneDecisionResult = {
  allow: boolean;
  decisionId?: string | null;
  reason?: string | null;
  dangerClass?: string | null;
};

export type ProphetLedgerAppendRequest = {
  kind: string;
  payload: unknown;
  scope?: string;
};

export type ProphetLedgerAppendResult = {
  ok: boolean;
  entryId?: string | null;
  reason?: string | null;
};

export type ProphetConnectedAppGrantResult = {
  granted: boolean;
  grantId?: string | null;
  reason?: string | null;
};

export interface ProphetWorkspaceHooks {
  emitCarrier(request: ProphetCarrierEmitRequest): Promise<ProphetCarrierEmitResult>;
  evaluateMembraneDecision(
    request: ProphetMembraneDecisionRequest,
  ): Promise<ProphetMembraneDecisionResult>;
  appendLedgerEvent(request: ProphetLedgerAppendRequest): Promise<ProphetLedgerAppendResult>;
  resolveConnectedAppGrant(scope: string): Promise<ProphetConnectedAppGrantResult>;
}
