<?php 
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('content-type: application/json; charset=utf-8, ');

    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);


    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/autoload.php';

    $mail = new PHPMailer(true);

    try{
        var_dump($_POST);
        $subject = isset( $_POST['subject']) ? $_POST['subject'] : 'contacto';
        $name = isset( $_POST['name'] ) ? $_POST['name'] : '';
        $mobile = isset( $_POST['mobile'] ) ? $_POST['mobile'] : '';
        $email = isset( $_POST['email'] ) ? $_POST['email'] : '';
        $message = isset( $_POST['message']) ? $_POST['message'] : '';
        $emailAgent = isset( $_POST['emailAgent']) && $_POST['emailAgent'] != "null" ? $_POST['emailAgent']: '';
        $nameAgent = isset( $_POST['nameAgent']) && $_POST['nameAgent'] != "null" ? $_POST['nameAgent'] : '-';
                
        $mensajeCompleto = 
        "Recibiste una consulta desde liderarpropiedades<br>
        <br>
        <b><u>Agente:</u> </b>".$nameAgent."<br/>
        <b><u>Asunto:</u> </b>Recibiste una consulta desde propiedadesmyc.cl<br/>
        <b><u>Cliente:</u> </b>".$name."<br/>
        <b><u>Email:</u> </b><a href='mailto:".$email."'>".$email."</a><br/>
        <b><u>Celular:</u> </b>".$mobile."<br/><br/>
        <b><u>Mensaje:</u> </b>".$message."<br/><br/>

        <a href='http://propiedadesmyc.cl/'>www.propiedadesmyc.cl.cl</a>
        ";
        
        $mail->isSMTP();                     
        $mail->Host = 'c2120007.ferozo.com';  
        $mail->SMTPAuth = true;                
        $mail->Username = 'contacto@propiedadesmyc.cl';
        $mail->Password = 'MCCprop2021';                
        $mail->SMTPSecure = 'ssl';                            
        $mail->Port = 465;          
        
        $mail->SetFrom( $email , 'Un cliente quiere contactar con propiedadesmyc.cl' );
        $mail->addAddress( "contacto@propiedadesmyc.cl", 'Mensaje desde la web');   
        $mail->isHTML(true);                                 
        $mail->Subject = $subject;
        $body = "$mensajeCompleto";
        $mail->MsgHTML( $body );
        $mail->CharSet = 'UTF-8';
        $sendEmail = $mail->Send();

        if($emailAgent != ''){
            $mail->SetFrom( $email , 'Un cliente quiere contactar contigo' );
            $mail->addAddress( $emailAgent, 'Mensaje desde la web');   
            $mail->isHTML(true);                                 
            $mail->Subject = $subject;
            $body = "$mensajeCompleto";
            $mail->MsgHTML( $body );
            $mail->CharSet = 'UTF-8';
            $sendEmail = $mail->Send();
        }

    }catch (Exception $e){
        var_dump($e);
    }
?>