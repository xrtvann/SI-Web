<?php

class Tablet
{
    protected $merk;
    protected $kamera;
    protected $memory;

    public function __construct($merk, $kamera, $memory)
    {
        $this->merk = $merk;
        $this->kamera = $kamera;
        $this->memory = $memory;
    }
}

class Handphone extends Tablet
{
    public $handphone_baru;

    public function __construct($merk, $kamera, $memory, $handphone_baru)
    {
        parent::__construct($merk, $kamera, $memory);
        $this->handphone_baru = $handphone_baru;
    }

    public function beliHandphone()
    {
        return "Saya membeli handphone " . $this->merk . " dengan kamera " . $this->kamera . " dan memory " . $this->memory . " dengan kondisi " . $this->handphone_baru;
    }
}