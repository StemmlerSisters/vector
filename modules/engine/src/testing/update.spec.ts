import { getRandomChannelSigner } from "@connext/vector-utils";
import { expect } from "chai";

import { applyUpdate } from "../../src/update";

import { config } from "./services/config";
import { mkHash } from "./utils/chain";
import { createTestChannelState, createTestChannelUpdate, createTestNetworkContext } from "./utils/channel";


// Should test that the application of an update results in the correct
// final state. While this function *will* fail if validation fails,
// the validation function is tested elsewhere
describe.only("applyUpdate", () => {
  const providerUrl = config.providerUrl;
  const signers = Array(2).fill(0).map(v => getRandomChannelSigner());


  it("should fail for an unrecognized update type", async () => {
    const update = createTestChannelUpdate(signers, {
      type: "fail" as any,
      nonce: 1,
    });
    const state = createTestChannelState(signers);
    const transfers = [];
    
    await expect(applyUpdate(update, state, transfers, providerUrl)).to.be.rejectedWith(`Unexpected UpdateType in received update`);
  });

  it("should work for setup", async () => {
    const state = createTestChannelState(signers);
    const update = createTestChannelUpdate(signers, { type: "setup", details: { timeout: "0", networkContext: createTestNetworkContext() } });
    
    const newState = await applyUpdate(update, state, [], providerUrl);
    expect(newState).to.containSubset({
      publicIdentifiers: signers.map(s => s.publicIdentifier),
      nonce: 1,
      latestDepositNonce: 0,
      channelAddress: update.channelAddress,
      timeout: update.details.timeout,
      participants: signers.map(s => s.address),
      balances: [],
      lockedValue: [],
      assetIds: [],
      merkleRoot: mkHash(),
      latestUpdate: undefined,
      networkContext: update.details.networkContext,
    });
  });

  it("should work for deposit", () => {});

  it("should work for create", () => {});

  it("should work for resolve", () => {});

  it("should fail for resolve if the initial state is not included", () => {});
});

// describe("generateUpdate", () => {});