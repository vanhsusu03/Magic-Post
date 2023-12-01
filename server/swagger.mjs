import swaggerJsDoc from 'swagger-jsdoc'

const options = {
	failOnErrors: true,
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'MagicPost API',
			version: '1.0.0',
			description: 'This is a MagicPost API application made with Express and documented with Swagger',
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			contact: {
				name: "Team 12",
				url: "https://github.com/vanhsusu03/Magic-Post",
			},
		},
		servers: [
			{
				url: 'http://localhost:3000',
				description: 'Local development server'
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT'
				}
			}
		},
		security: [
			{
				bearerAuth: []
			}
		]
	},
	apis: ['./routes/*.mjs']
}

const specs = swaggerJsDoc(options)
export default specs