interface USER_PASSWORD {
    phone: string
    password: string
}


interface USER_PASSWORD_RES {
    code: number
    data: {
        accessToken?: string
    }
    msg: string
}

interface FORGET_PASSWORD {
    mobile: string
    code: string
    password: string
}

interface SEND_PHONE {
    mobile: string
    type: number
}

interface LOGIN_CODE {
    mobile: string
    code: string
}