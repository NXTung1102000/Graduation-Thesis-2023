from .toanmath import ToanMathService
from .onluyen import OnluyenService
from schema.constant import NameSourceExam
from .timdapan import TimDapAnService
# from .mathvn import MathVNService

FACTORY = {
    NameSourceExam.TOAN_MATH :ToanMathService, 
    NameSourceExam.ON_LUYEN : OnluyenService,
    NameSourceExam.TIM_DAP_AN: TimDapAnService,
    # NameSourceExam.MATH_VN: MathVNService,
}