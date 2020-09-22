// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.1;
pragma experimental ABIEncoderV2;

import "./Types.sol";


interface IAdjudicator {

    // TODO: add disputes to args

    function disputeChannel(
        ChannelDispute memory oldChannelDispute,
        CoreChannelState memory ccs,
        bytes[2] memory signatures
    ) external returns(ChannelDispute newChannelDispute);


    function defundChannel(
        CoreChannelState memory ccs
    ) external;


    function disputeTransfer(
        CoreTransferState memory cts,
        bytes32[] memory merkeProofData
    ) external;

    function defundTransfer(
        CoreTransferState memory cts,
        bytes memory encodedInitialTransferState,
        bytes memory encodedTransferResolver
    ) external;

}
