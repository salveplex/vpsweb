<?php 
if($_COOKIE['lang'] == 'no' OR !isset($_COOKIE['lang'])){
include('./include/header.php');
include($language_include_trygt_heim);

echo '
	<div class="col-md-12 no-padding">
		<div class="section-padding"></div>
			<div class="container">			
				<div class="col-md-8">
					<h2>' . $lang_trygt_heim_sect_1 . '</h2>
					<p>' . $lang_trygt_heim_sect_1_info . '</p>
				</div>
				<div class="col-md-4 col-sm-4 no-right-padding  pull-right">
					<div class="more-than-you">
						<h3>' . $lang_trygt_heim_info_title . '</h3>
						<img src="images/icon/title-separator.png" alt="title-separator"/>
						
						<ul>
							<li>' . $lang_trygt_heim_info_card . '</li>
							<li>' . $lang_trygt_heim_info_25 . '</li>
							<li>' . $lang_trygt_heim_info_adult . '</li>
						</ul>
					</div>			
				</div>
			</div>
		</div>
	<div class="section-padding"></div>
		<div class="no-padding ">
			<div class="container">
				<div class="col-md-8">
					<h2>' . $lang_trygt_heim_sect_2 . '</h2>
					<p>' . $lang_trygt_heim_sect_2_info . '</p>
				</div>
				<div class="col-md-4">
					<h2>' . $lang_trygt_heim_priss_1 . '</h2>
					<p>' . $lang_trygt_heim_priss_2 . '</p>
					<p>' . $lang_trygt_heim_priss_3 . '</p>
				</div>
			</div>
		</div>
	<div class="section-padding"></div>
		<div class="no-padding ">
			<div class="container">
				<div class="col-md-8">
					<h2><b>' . $lang_trygt_heim_sect_3_1 . ' </b> ' . $lang_trygt_heim_sect_3_2 . '</h2>
					<p>' . $lang_trygt_heim_sect_3_info . '</p>
				</div>
				<div class="col-md-4">
					<h2>' . $lang_trygt_heim_critic_title . '</h2>
					<p>' . $lang_trygt_heim_critic_info . '<a  href="https://www.skyss.no/kontakt-oss/kontaktskjema/">' . $lang_trygt_heim_critic_link . '</a></p>
				</div>
			</div>
		</div>
	<div class="section-padding"></div>';
		
		
include('./include/footer.php');
echo '

</body>
</html>';
}
else {
	header('Location: /vt/');
}
?>