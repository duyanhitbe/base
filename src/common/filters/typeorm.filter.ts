import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
	catch(exception: TypeORMError, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse();
		const message: string = (exception as TypeORMError).message;
		const code: number = (exception as any).code;
		const customResponse = {
			status: 500,
			message: 'Internal Server Error',
			errors: [{ code: code, message: message }]
		};
		response.status(customResponse.status).json(customResponse);
	}
}
