import {Document, Model, model, Schema} from 'mongoose';
import {IRawInterface} from '../models/IRawInterface';

export interface IRawInterfaceModel extends IRawInterface, Document {}

export const RawInterfaceSchema: Schema = new Schema({
	_id: String,
	declaration: {
		raw: String,
		json: {}
	},
	paths: [String]
});

export const RawInterface: Model<IRawInterfaceModel> = model<IRawInterfaceModel>('RawInterface', RawInterfaceSchema);
