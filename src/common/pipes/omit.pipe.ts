import { Injectable, PipeTransform } from '@nestjs/common';
import { omit } from 'lodash';

@Injectable()
export class OmitPipe implements PipeTransform<any> {
	constructor(private fields: string[]) {}

	transform(value: any) {
		return omit(value, ...this.fields);
	}
}
