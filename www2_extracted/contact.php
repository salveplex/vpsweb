<?php

iconv_set_encoding("internal_encoding", "UTF-8");

$mailTo     = 'post@vosstaxi.no';

$successMsg = 'Thank you, mail sent successfuly!';

$fillMsg    = 'Please fill all fields!';

$errorMsg   = 'Hm.. seems there is a problem, sorry! Try sending us an e-mail instead';

$subject_email = 'Nett henvendelse: ';


if(
    !isset($_REQUEST['contact-name']) ||   
	!isset($_REQUEST['contact-email']) ||
	!isset($_REQUEST['contact-phone']) ||
	!isset($_REQUEST['contact-subject']) ||
	!isset($_REQUEST['contact-message']) ||
    empty($_REQUEST['contact-name']) ||   
    empty($_REQUEST['contact-email']) ||
    empty($_REQUEST['contact-phone']) ||
    empty($_REQUEST['contact-subject']) ||
	empty($_REQUEST['contact-message'])
) {
	
	if( empty($_REQUEST['contact-name']) && empty($_REQUEST['contact-email']) && empty($_REQUEST['contact-phone']) && empty($_REQUEST['contact-subject']) && empty($_REQUEST['contact-message']) ) {
		$json_arr = array( "type" => "error", "msg" => $fillMsg );
		echo json_encode( $json_arr );		
	} else {

		$fields = "";
		if( !isset( $_REQUEST['contact-name'] ) || empty( $_REQUEST['contact-name'] ) ) {
			$fields .= "Name";
		}
		
		if( !isset( $_REQUEST['contact-email'] ) || empty( $_REQUEST['contact-email'] ) ) {
			if( $fields == "" ) {
				$fields .= "Email";
			} else {
				$fields .= ", Email";
			}
		}

		if( !isset( $_REQUEST['contact-phone'] ) || empty( $_REQUEST['contact-phone'] ) ) {
			if( $fields == "" ) {
				$fields .= "Phone";
			} else {
				$fields .= ", Phone";
			}
		}

		if( !isset( $_REQUEST['contact-subject'] ) || empty( $_REQUEST['contact-subject'] ) ) {
			if( $fields == "" ) {
				$fields .= "Subject";
			} else {
				$fields .= ", Subject";
			}
		}

		if( !isset( $_REQUEST['contact-message'] ) || empty( $_REQUEST['contact-message'] ) ) {
			if( $fields == "" ) {
				$fields .= "Message";
			} else {
				$fields .= ", Message";
			}		
		}	
		$json_arr = array( "type" => "error", "msg" => "Please fill ".$fields." fields!" );
		echo json_encode( $json_arr );		
	
	}
	

} else {

	if (!filter_var($_REQUEST['contact-email'], FILTER_VALIDATE_EMAIL) === false) {
		
		$msg .= "Melding: ".$_REQUEST['contact-message']."\r\n \r\n";
		$msg .= "Navn: ".$_REQUEST['contact-name']."\r\n";		
		$msg .= "E-post: ".$_REQUEST['contact-email']."\r\n";
		$msg .= "Tlf: ".$_REQUEST['contact-phone']."\r\n";
		
		$success = mail(utf8_decode($mailTo), utf8_decode($subject_email. '' .$_REQUEST['contact-subject']), utf8_decode($msg), utf8_decode('From: ' . $_REQUEST['contact-name'] . '<' . $_REQUEST['contact-email'] . '>'));
		
		if ($success) {
			$json_arr = array( "type" => "success", "msg" => $successMsg );
			echo json_encode( $json_arr );
		} else {
			$json_arr = array( "type" => "error", "msg" => $errorMsg );
			echo json_encode( $json_arr );
		}
		
	} else {
 		$json_arr = array( "type" => "error", "msg" => "Please enter valid email address!" );
		echo json_encode( $json_arr );	
	}

}
?>