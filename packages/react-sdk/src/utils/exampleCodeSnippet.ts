export const exampleCodeSnippet = `import * as yup from 'yup';

const schema = yup.object().shape({
	name: yup.string().required(),
	age: yup.number().required().positive().integer(),
});

const data = {
	name: 'John Doe',
	age: 30,
};

schema
	.validate(data)
	.then(() => {
		console.log('Data is valid');
	})
	.catch((err) => {
		console.log(err.errors);
	});`;
