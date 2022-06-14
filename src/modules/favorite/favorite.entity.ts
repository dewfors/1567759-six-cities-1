import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {OfferEntity} from '../offer/offer.entity.js';
import {UserEntity} from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

@modelOptions({
  schemaOptions: {
    collection: 'favorites',
  }
})

class FavoriteEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    ref: () => UserEntity,
  })
  public user!: Ref<UserEntity>;

  @prop({
    required: true,
    ref: () => OfferEntity,
  })
  public offer!: Ref<OfferEntity>;
}

const FavoriteModel = getModelForClass(FavoriteEntity);

export {FavoriteEntity, FavoriteModel};
