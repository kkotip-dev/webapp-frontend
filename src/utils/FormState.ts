export enum FormState {
    DEFAULT,
    LOADING,
    ERROR
};

export function getStateClassname(state: FormState) {
    switch (state) {
        case FormState.LOADING: return "loading";
        case FormState.ERROR: return "invalid";
    }

    return "";
}