import { action, autorun, computed, makeObservable, observable } from 'mobx';
import { RecipeId } from 'domain/recipes';
import localStorage from 'services/storage/local-storage';

class UserStore {
  @observable
  private _favorites: RecipeId[] = [];

  constructor() {
    makeObservable(this);

    const storedFavorites = localStorage.get('favorites');

    if (storedFavorites) {
      this._favorites = storedFavorites;
    }

    autorun(() => {
      localStorage.set('favorites', this._favorites);
    });
  }

  @computed
  get favorites() {
    return this._favorites;
  }

  isFavorite(id: RecipeId) {
    return this._favorites.includes(id);
  }

  @action.bound
  toggleFavorite(id: RecipeId) {
    if (this.isFavorite(id)) {
      this.favorites.splice(this._favorites.indexOf(id), 1);
    } else {
      this._favorites.push(id);
    }
  }
}

export default UserStore;
