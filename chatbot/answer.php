<?php
error_reporting(E_ERROR | E_PARSE);
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '12345678');
define('DB_DATABASE', 'chatbot');




$db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
if ($db->connect_error) {
    die(create_msg("db",""));
    
} 
    mysqli_query($db,"SET CHARACTER SET utf8");
    mysqli_query($db,"SET NAMES utf8");
    $query = "SELECT * FROM list_ques";
    $sql = mysqli_query($db,$query);
    $result = array();
    while ($row_user = mysqli_fetch_assoc($sql))
        $result[] = $row_user;

//     function so_khop($ques1, $ques2){
//     $lev = levenshtein($ques1,$ques2);
//     $len1=strlen($ques1);
//     $len2=strlen($ques2);
//     if ($len1 > $len2){
//         $max_len = $len1;
//     }else{
//         $max_len = $len2;
//     }
//     return (double)($max_len - $lev)/($max_len);
//   }
  
//   function check($list_ques,$ques){
//     $max = 0;
    
//     foreach ($list_ques as $sen){
//         $test = so_khop($sen['question'],$ques);
//         if($max< $test){
//                 $max = $test;
//                 $tmp = $sen;
//               }
//       }
//     return $tmp;
     
//   }
  $question = $_POST['question'];
//  echo check($result,$question)['answer'];
 function check_ngram($ngram, $ques){
	$list = explode($ngram, $ques);
	if( sizeof($list) >1){
		return 1;
	}
	return 0;
}

function check_subset($ques1,$ques2){
	if(strlen($ques1) > strlen($ques2)){
		$tmp = $ques1;
		$ques1=$ques2;
		$ques2=$tmp;
	}
	$check = check_ngram($ques1, $ques2);
    if($check == 1){
        return 1;
    }
    $list_ques1 = explode(" ", $ques1);
    $countuni = 0; $uni = 0;
    $countbi = 0; $bi = 0;
    $counttri = 0; $tri = 0;
    for($i = 0; $i<sizeof(list_ques1);$i++){
        $uni = $uni+1;
        $checkuni = check_ngram($list_ques1[$i], $ques2);
        $countuni = $countuni+$checkuni;
    }
    for($i = 0; $i<sizeof(list_ques1)-1;$i++){
        $bi = $bi+1;
        $bigram = $list_ques1[$i]+$list_ques1[$i+1];
        $checkbi = check_ngram($bigram, $ques2);
        $countbi = $countbi+$checkbi;
    }
    for($i = 0; $i<sizeof(list_ques1)-2;$i++){
        $tri = $tri+1;
        $trigram = $list_ques1[$i]+$list_ques1[$i+1]+$list_ques1[$i+2];
        $checktri = check_ngram($trigram, $ques2);
        $counttri = $counttri+$checktri;
    }
    (double)$total = (double)(0.2*$countuni/$uni)+(double)(0.2*$countbi/$bi)+(double)(0.6*$counttri/$tri);
    (double)$checked = $total;
    return $checked;
}
    //         foreach ($list_ques as $sen){
    //         $test = so_khop($sen['question'],$ques);
    //         if($max< $test){
    //                 $max = $test;
    //                 $tmp = $sen;
    //               }
    //       }
function check_ques_ngram($ques,$list_ques){
    // var_dump($list_ques);
	$max = 0.0;
	$goal = "";
	for($i = 0;$i<sizeof($list_ques); $i++){
		(double) $check = check_subset($ques, $list_ques[$i]['question']);
		if ($max < $check){
			$max = $check;
			$goal = $list_ques[$i];
		}
	}
	return $goal;
}

$str = check_ques_ngram("điện tử", $result)['answer'];
if($str == "") echo "Bạn hãy nhập keyword khác";
else echo $str;

?>