import React ,{useState} from "react";
import { useNavigate, useLocation } from "react router dom";
import { FiUser , Filock, Fishield, Fieye ,Fieyeoff, Fichevrondom, FiArrowRight,Fizap} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {Roles} from "../../utils/constants";
import styles from "./Login.module.css";

const Demo_users = [
    {role: Roles.ADMIN, username : 'admin", first_name: "Dativah .', Last_name: "Kachere", role_display: "System Administrator"}
    {role: Roles.HRDIRECTOR, username : "hr_director", first_name: 'Director BOB', Last_name: 'biker ', role_display: "HR Director"}']
