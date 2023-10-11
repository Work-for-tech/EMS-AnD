const nodemailer = require('nodemailer');

const sendMail = async (to, path,fileName,id) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'royalclubjanadvjava@gmail.com',
            pass: 'tneimehbhtgtrdkm',
        },
    });


    const mailOptions = {
        from: 'royalclubjanadvjava@gmail.com',
        to: to,
        subject: 'Purchase Order from EMS Kuha',
        text: `Purchase Order No : ${id}`,
        attachments: [
            {
                filename: fileName,
                path: path,
            },
        ],
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email: ' + error);
            return error
        } else {
            console.log('Email sent: ' + info.response);
            return info.response
        }
    });
}

module.exports=sendMail


