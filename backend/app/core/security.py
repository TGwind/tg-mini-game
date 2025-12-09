import hashlib
import hmac
from urllib.parse import parse_qsl
from typing import Optional, Dict
from app.core.config import settings


def verify_telegram_init_data(init_data: str) -> Optional[Dict]:
    """
    验证 Telegram WebApp 的 init_data
    
    Args:
        init_data: Telegram WebApp 传来的 initData 字符串
        
    Returns:
        验证成功返回解析后的数据字典，失败返回 None
    """
    # TODO: 实现 Telegram init_data 验证逻辑
    # 参考: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
    
    try:
        # TODO: 解析 init_data
        parsed_data = dict(parse_qsl(init_data))
        
        # TODO: 提取 hash 值
        received_hash = parsed_data.pop('hash', None)
        if not received_hash:
            return None
        
        # TODO: 构建数据检查字符串
        # data_check_string = "\n".join(f"{k}={v}" for k, v in sorted(parsed_data.items()))
        
        # TODO: 使用 bot token 生成密钥
        # secret_key = hmac.new("WebAppData".encode(), settings.TELEGRAM_BOT_TOKEN.encode(), hashlib.sha256).digest()
        
        # TODO: 计算预期的 hash
        # calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
        
        # TODO: 比较 hash 值
        # if calculated_hash != received_hash:
        #     return None
        
        return parsed_data
        
    except Exception as e:
        print(f"Telegram init_data verification failed: {e}")
        return None

