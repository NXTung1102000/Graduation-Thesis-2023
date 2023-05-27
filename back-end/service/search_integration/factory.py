from .toanmath import ToanMathService
from .onluyen import OnluyenService
from schema.constant import NameSourceExam


FACTORY = {
    NameSourceExam.TOAN_MATH :ToanMathService, 
    NameSourceExam.ON_LUYEN : OnluyenService,
    # NameSourceExam.TIM_DAP_AN: ,
    # NameSourceExam.MATH_VN: ,
}