const nodemailer = require('nodemailer');
var myArgs = process.argv[2]
const messageHtml = `
<p style="font-family:Arial, sans-serif;font-size:14px;
font-weight:normal"> Olá Time de Just Billing ! </p>
<p style="font-family:Arial, sans-serif;font-size:14px;
font-weight:normal"> Favor verificar a pipeline de testes dentro do Azure Devops, pois ela falhou.  </p>

<br>
Para maiores informações entre em contato com o QA: douglas.oliveira@take.net
<br>
Segue o link da pipeline que falhou
<a href="https://curupira.visualstudio.com/BLiP/_build/results?buildId=${myArgs}">AzureDevops</a> 
<br>

<p>Até mais.</p>
`
const mailOptions = {
	from: 'douglas.oliveira@take.net',
	to: 'justbilling.platform@take.net',
	subject: 'Falha na Pipeline',
	html: messageHtml
};

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: "douglas.oliveira@take.net",
		pass: "wqctseenognjdamd"
	}
});


transporter.sendMail(mailOptions, function (error, info) {
	if (error) {
		console.log(error);
	} else {
		console.log('Email enviado: ' + info.response);
	}
});