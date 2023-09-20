import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function useSwagger(app: INestApplication) {
	const logger = new Logger('Swagger');
	const port = process.env.PORT || 3000;
	const path = 'docs';
	const config = new DocumentBuilder()
		.setTitle('Service Documentation')
		.setDescription('Description')
		.setVersion('1.0')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config, {
		extraModels
	});
	SwaggerModule.setup(path, app, document, {
		swaggerOptions: {
			tagsSorter: 'alpha',
			operationsSorter: (a, b) => {
				const methodsOrder = ['get', 'post', 'put', 'patch', 'delete', 'options', 'trace'];
				let result =
					methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'));

				if (result === 0) {
					result = a.get('path').localeCompare(b.get('path'));
				}

				return result;
			}
		}
	});
	logger.log(`Your documentation is running on http://localhost:${port}/${path}`);
}

const extraModels = [AdminEntity, ApplicationEntity, MerchantEntity];
