// Task 1
type Addresses = Record<string, string | { address: keyof Addresses }>;

declare function addresses(address: Addresses): void;

// Task 2
type InstructionEntry = {
    id: string;
    signer?: true;
    address?: keyof Addresses;
};

type Instructions = Record<string, { accounts: Record<string, InstructionEntry> }>;

function instructions(input: { addresses: Addresses; instructions: Instructions }): Instructions {
    const { addresses, instructions } = input;

    for (const key in instructions.accounts) {
        const accounts = instructions.accounts[key];
        for (const entryKey in accounts) {
            const entry = accounts[entryKey];
            if (entry.address !== undefined) {
                const address = addresses[entry.address];
                if (typeof address === 'object') {
                    accounts[entryKey].address = address.address;
                } else if (address !== undefined) {
                    accounts[entryKey].address = address;
                }
            }
        }
    }

    return instructions;
}

// Task 3
type UnspecifiedIds<T extends Record<string, { accounts: Record<string, InstructionEntry> }>, K extends keyof T> = {
    [P in keyof T[K]['accounts']]: T[K]['accounts'][P]['address'] extends undefined ? T[K]['accounts'][P]['id'] : never;
}[keyof T[K]['accounts']];

// Example usage:
const input = {
    addresses: {
        staking_program_id: "5XDdQrpNCD89LtrXDBk5qy4v1BW1zRCPyizTahpxDTcZ",
        locked_token_mint_id: "3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR",
        reward_token_mint_id: { address: "locked_token_mint_id" },
        system_program_id: "11111111111111111111111111111111",
    },
    instructions: {
        admin_init: {
            accounts: [
                { id: "admin_id", signer: true },
                { id: "program_id", address: "staking_program_id" },
                { id: "locked_token_mint_id", address: "locked_token_mint_id" },
                { id: "reward_token_mint_id", address: "reward_token_mint_id" },
                { id: "system_program_id", address: "system_program_id" },
            ],
        },
    },
};

const result = instructions(input);
type UnspecifiedIdsResult = UnspecifiedIds<typeof input, keyof typeof input>;

// UnspecifiedIdsResult will be "admin_id"