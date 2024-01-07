import { atom } from 'recoil';

export const states = {
    survivorPerksState: atom({
        key: 'survivorPerksState',
        default: []
    }),
    survivorPerkTraitsState: atom({
        key: 'survivorPerkTraitsState',
        default: []
    }),
    survivorsState: atom({
        key: 'survivorsState',
        default: []
    }),
    survivorItemsState: atom({
        key: 'survivorItemsState',
        default: []
    }),
    allowEmptySurvivorPerk: atom({
        key: 'allowEmptySurvivorPerk',
        default: true
    }),
    noItemAllowedState: atom({
        key: 'noItemAllowedState',
        default: true
    }),
    survivorItemAddOnsState: atom({
        key: 'survivorItemAddOnsState',
        default: []
    }),
    noItemAddOnAllowedState: atom({
        key: 'noItemAddOnAllowedState',
        default: true
    }),
    survivorOfferingsState: atom({
        key: 'survivorOfferingsState',
        default: []
    }),
    noSurvivorOfferingAllowedState: atom({
        key: 'noSurvivorOfferingAllowedState',
        default: true
    }),
    defaultEmptyAllowedState: atom({
        key: 'defaultEmptyAllowedState',
        default: "not allowed",
    }),
    killersState: atom({
        key: "killersState",
        default: []
    }),
    killerOfferingsState: atom({
        key: "killerOfferingsState",
        default: []
    }),
    noKillerOfferingAllowedState: atom({
        key: "noKillerOfferingAllowedState",
        default: true
    }),
    killerAddOnsState: atom({
        key: "killerAddOnsState",
        default: []
    }),
    noKillerAddOnAllowedState: atom({
        key: "noKillerAddOnAllowedState",
        default: true
    }),
    killerPerksState: atom({
        key: "killerPerksState",
        default: []
    }),
    allowEmptyKillerPerkSlot: atom({
        key: "allowEmptyKillerPerkSlot",
        default: true
    }),
}