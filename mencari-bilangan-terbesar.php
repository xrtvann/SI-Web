<?php
function getMaxNumber($num1, $num2)
{
    $result = max($num1, $num2);
    return $result;
}
echo getMaxNumber(100, 150);