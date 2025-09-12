<?php

class Topi extends ItemProduct {

    private $model = "Flat Cap";
    public function ukuran() {
        return "58 cm";
    }

    public function warna() {
        return "Hitam";
    }

    public function nama() {
        return "Flat cap new edition";
    }

    public function getModel() {
        return "Model: " . $this->model;
    }
}