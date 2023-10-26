/* eslint-disable no-undef */
const nodemailer = require("nodemailer");
// email stuff
source = "Hello";
exports.sendEmail = async function (email, source, name) {
	if(source=="project"){
		// 1) Create a transporter
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "sdevloper665@gmail.com",
				pass: "eelorzjjwxswhpae",
				//   CYG5dg<qB3gWf{)2
			},
		});
		// 2) Define the email options
		const mailOptions = {
			from: "sdevloper665@gmail.com",
			to:email,
			subject:"Project assign to you ",
			html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" lang="en">

          <head><link rel="stylesheet" type="text/css" hs-webfonts="true" href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi">
            <title>Email template</title>
            <meta property="og:title" content="Email template">

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <style type="text/css">

              a{
                text-decoration: underline;
                color: inherit;
                font-weight: bold;
                color: #253342;
              }

              h1 {
                font-size: 56px;
              }

                h2{
                font-size: 28px;
                font-weight: 900;
              }

              p {
                font-weight: 100;
              }

              td {
            vertical-align: top;
            color: #0958a7;

              }

              #email {
                margin: auto;
                width: 600px;
                background-color: white;
              }

            </style>

          </head>

            <body bgcolor="#F5F8FA" style="width: 100%; margin: auto 0; padding:0; font-family:Lato, sans-serif; font-size:18px; color:#0958a7; word-break:break-word">

         <!-- <! View in Browser Link -->

        <div id="email">

              <!-- <! Banner -->
              <table role="presentation" width="100%">
                <tr>

                  <br>
                      <td bgcolor="#314e79" align="center" style="color: white;">


                        <h1> Congratulation! </h1>

                      </td>
                </table>

            <!-- <! First Row -->

          <table role="presentation" border="0" cellpadding="0" cellspacing="10px" style="padding: 30px 30px 30px 60px;">
             <tr>
               <td>
                <h2>Project: ${name}</h2>
                    <p>
                      To Employee,
                  <br>
                  <br>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hi Team,  we hope you are doing well.
        I am pleased to announce that we will be moving to new project .
        You has done an incredible job in Previous project . Now, you will use your knowledge and experience to Future Growth Plan.
        But the new role for the employee may come with changes in shift and performance goals. We’ll help you to ensure a smooth transition process with our team will get the work done for you! 🤩
                    </p>
                  </td>
                  </tr>
                         </table>

          <table role="presentation" bgcolor="#EAF0F6" width="100%" style="margin-top: 50px;" >
              <tr>
                  <td align="center" style="padding: 30px 30px;">

                 <h2> Volansys Project Management Tool </h2>
                    <p>
                      Nam vel lobortis lorem. Nunc facilisis mauris at elit pulvinar, malesuada condimentum erat vestibulum. Pellentesque eros tellus, finibus eget erat at, tempus rutrum justo.

                      </p>
                      <a href="#"> Ask us a question</a>
                  </td>
                  </tr>
              </table>

              </div>
            </body>
              </html>`
		};
		// 3) Actually send the email
		await transporter.sendMail(mailOptions, function () {
			// if (error) throw Error(error);
			console.log("Email Sent Successfully");
			console.log(mailOptions);
		});
	}
	else{
		// 1) Create a transporter
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "sdevloper665@gmail.com",
				pass: "eelorzjjwxswhpae",
				//   CYG5dg<qB3gWf{)2
			},
		});
		// 2) Define the email options
		const mailOptions = {
			from: "sdevloper665@gmail.com",
			to: email.Assignee_email,
			subject: "Ticket assign to you",
			html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" lang="en">
            
      <head><link rel="stylesheet" type="text/css" hs-webfonts="true" href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi">
        <title>Email template</title>
        <meta property="og:title" content="Email template">
        
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <style type="text/css">
        .im {
          color: #0958a7;
      }
          a{ 
            text-decoration: underline;
            color: inherit;
            font-weight: bold;
            color: #253342;
          }
          
          h1 {
            font-size: 56px;
          }
          
            h2{
            font-size: 28px;
            font-weight: 900; 
          }
          
          p {
            font-weight: 100;
            
          }
          .content{
            text-align: justify;
          }
          
          td {
        vertical-align: top;
        color: #0958a7;
          }
          
          #email {
            margin: auto;
            width: 600px;
            background-color: white;
          }
      
          
        </style>
        
      </head>
        
        <body bgcolor="#F5F8FA" style="width: 100%; margin: auto 0; padding:0; font-family:Lato, sans-serif; font-size:18px; color:#0958a7; word-break:break-word">
      
     <!-- <! View in Browser Link -->  
          
    <div id="email">
    
      
          
          <!-- <! Banner -->  
          <table role="presentation" width="100%">
            <tr>
              
              <br>
                  <td bgcolor="#314e79" align="center" style="color: white;">
                    
                    <h1> Task </h1>
                    
                  </td>
            </table>
      
      
      
      
        <!-- <! First Row --> 
      
      <table role="presentation" border="0" cellpadding="0" cellspacing="10px" style="padding: 30px 30px 30px 60px;">
         <tr>
           <td>
            <h2>Ticket: ${name.ticket_title}</h2>
                <p class="content">
                  To ${email.Assignee_name},
              <br>
              <br>
    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hi ${email.Assignee_name},  we hope you are doing well.
    This mail is to inform you that <b>${name.ticket_title}</b> is asigned to you.   <br>
    <br>
    <br>
  <b>Ticket Details:</b>
  <br>
  Ticket Title : ${name.ticket_title}
  <br>Reporter Details: <br>
  Name: ${email.Reporter_name}<br>
  Email Id: ${email.Reporter_email}
  
                </p>
              </td> 
              </tr>
                     </table>
      
      
      <table role="presentation" bgcolor="#EAF0F6" width="100%" style="margin-top: 50px;" >
          <tr>
              <td align="center" style="padding: 30px 30px;">
                
             <h2> Volansys Project Management Tool </h2>
                <p>
                  Nam vel lobortis lorem. Nunc facilisis mauris at elit pulvinar, malesuada condimentum erat vestibulum. Pellentesque eros tellus, finibus eget erat at, tempus rutrum justo. 
          
                  </p>
                  <a href="#"> Ask us a question</a>      
              </td>
              </tr>
          </table>
    
          
     
          </div>
        </body>
          </html>`
		};
		// 3) Actually send the email
		await transporter.sendMail(mailOptions, function () {
			// if (error) throw Error(error);
			console.log("Email Sent Successfully");
			console.log(mailOptions);
		});

	}
	// console.log(email, source, name);
	// 
 


  
};
