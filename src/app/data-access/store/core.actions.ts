export class FetchCodes {
  static readonly type = '[Core] Fetch codes';
}

export class FetchRates {
  static readonly type = '[Core] Fetch rates';
}

export class AddFavorite {
  static readonly type = '[Core] Add favorite';
  constructor(public code: string) {}
}

export class RemoveFavorite {
  static readonly type = '[Core] Remove favorite';
  constructor(public code: string) {}
}

export class ReorderFavorites {
  static readonly type = '[Core] Reorder favorites';
  constructor(public favorites: string[]) {}
}

export class SetBaseCurrency {
  static readonly type = '[Core] Set base currency';
  constructor(public base: string) {}
}

export class ResetState {
  static readonly type = '[Core] Reset state';
}
