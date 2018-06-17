import {Document, Model, model, Schema} from 'mongoose';
import {Interfaces} from '../models/Interfaces';

export interface IRawInterfaceModel extends Interfaces, Document {}

export const RawInterfaceSchema: Schema = new Schema({
	githubId: String,
	declaration: {
		raw: String,
		parsed: {}
	},
	paths: [String]
});

export const RawInterface: Model<IRawInterfaceModel> = model<IRawInterfaceModel>('RawInterface', RawInterfaceSchema);
