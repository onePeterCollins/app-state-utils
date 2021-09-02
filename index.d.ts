type MutationHelperMethod = ((state: object) => object) | ((state: any) => any)

interface MutationHelperMethods {
    createEntry: MutationHelperMethod
    updateValue: MutationHelperMethod
    clearValue: MutationHelperMethod
    deleteEntry: MutationHelperMethod
    logState: MutationHelperMethod
}

declare function MutationHelper (state: object): MutationHelperMethods;
