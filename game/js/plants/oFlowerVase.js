export var oFlowerVase = InheritO(CPlants, {
	EName: "oFlowerVase",
	CName: "Vase", // ID 中文名
	SunNum: 0,
	coolTime: 0, // 阳光 冷却时间
	canEat: 0,
	Stature: -1, // 是否可以被吃 身高
	HP: 10,
	width: 89,
	height: 95,
	beAttackedPointR: 53, // 血量 宽度 高度 判定点

	PotSize: 0,
	XRay: 0,
	CardTime: 1500, // 花瓶种类 是否透视 卡片冷却时间
	Ele: null,
	ImgEle: null,
	EleBG: null,
	EleCard: null,
	EleClick: null, // 透视状态下背景Ele 透视状态下图片Ele
	VaseValue: null, // 花瓶本身数据，格式: { "Type": "Plants | Zombie | SunNum", "Value": oSunFlower | oZombie | 300, }
	AutoSetXRay: true,
	AutoJoker: true,
	AutoSummonBase: true,
	BasePlant: null, // 是否自动改变XRay 小丑是否自爆 是否自动生成底座（如在河里生成睡莲）底座植物

	AudioArr: ["VaseBreaking0", "VaseBreaking1", "VaseBreaking2", "VaseBreaking3"],
	PicArr: ["images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png"],
	Tooltip: "Break me!",
	Produce: "Beat me, hate me, you can never break me!",

	SetStyle(Kind) {
		// 设置花瓶皮肤
		var self = this;
		var { XRay } = self; // 获取基本信息
		var PLeft = Kind * 80;
		var PRight = PLeft + 80; // 计算裁剪

		self.PotSize = Kind; // 设置花盆类型
		SetStyle(self.ImgEle, {
			// 花盆本体的图片
			clip: "rect(101px, " + PRight + "px, 202px, " + PLeft + "px)",
			top: "-101px",
			left: -80 * Kind + "px",
		});
		SetStyle(self.EleBG, {
			// 花盆透视时的图层
			clip: "rect(0px, " + PRight + "px, 101px, " + PLeft + "px)",
			top: "0px",
			left: -80 * Kind + "px",
		});

		self.SetXRay(XRay); // 设置透视功能
	},

	SetXRay(TurnOn) {
		// 设置花瓶透视
		var self = this;
		var XRay = !!TurnOn; // 获取基本信息

		self.XRay = XRay; // 设置 XRay
		SetAlpha(self.EleBG, XRay * 100, XRay * 1); // 显示透视图层
		SetAlpha(self.EleCard, XRay * 100, XRay * 1); // 显示预览图层
	},

	InitImage(Kind, XRay) {
		// 初始化图片
		var self = this;
		var ID = self.id;
		var { Ele } = self;
		var { ImgEle } = self;
		var { EleBG } = self;
		var { EleCard } = self;

		if (!Ele) {
			self.Ele = Ele = $(ID);
		} // 初始化 Ele
		if (!ImgEle) {
			self.ImgEle = ImgEle = Ele.childNodes[1];
		} // 初始化 ImgEle
		if (!EleBG) {
			((self.EleBG = EleBG = self.ImgEle.cloneNode(false)), Ele.appendChild(EleBG));
		} // 初始化 EleBG，克隆图片，并复制到自己的图片下
		if (!EleCard) {
			self.EleCard = EleCard = NewEle("", "img", "", {}, Ele);
		} // 初始化 EleCard 节点
		if (!XRay) {
			XRay = self.XRay;
		}
		if (!Kind) {
			Kind = self.PotSize;
		}

		var selfValue = self.VaseValue || {};
		var VType = selfValue.Type || "Plants";
		var VValue = selfValue.Value || (VType === "SunNum" ? 50 : VType === "Plants" ? oPeashooter : oZombie); // 获取该花瓶的内部玩意
		switch (VType) {
			case "Plants": // 植物类型
				EleCard.style = "clip:rect(auto,auto,40px,auto);width:70px;height:80px;top:25px;left:5.5px;"; // 裁剪图片
				EleCard.src = VValue.prototype.PicArr[VValue.prototype.CardGif]; // 显示植物卡槽
				break;

			case "Zombie":
				if ($User.Client.Mobile) {
					// 如果当前设备是移动端，为了移动端屏幕考虑，直接显示卡槽
					EleCard.style = "clip:rect(auto,auto,40px,auto);width:70px;height:80px;top:25px;left:5.5px;"; // 裁剪图片
					EleCard.src = VValue.prototype.PicArr[VValue.prototype.CardGif]; // 显示植物卡槽
				} else {
					var PT = VValue.prototype;
					var ZWidth = PT.beAttackedPointR - PT.beAttackedPointL;
					var ZHeight = PT.height - PT.GetDTop;
					var MaxW = 60;
					var MaxH = 75;
					var K = MaxW / MaxH;
					var EK; // 横款最大值、 横款比值
					var ELeft = 0;
					var ETop = 0;
					var LPoint = PT.beAttackedPointL; // 最终的相对位置

					if (ZWidth > ZHeight) {
						((EK = ZWidth / MaxW), (ZHeight /= EK), (ZWidth = MaxW));
					}
					// 等比缩放
					else if (ZHeight > ZWidth) {
						((EK = ZHeight / MaxH), (ZWidth /= EK), (ZHeight = MaxH));
					} // 等比缩放

					((ELeft = 20 / 2 + -LPoint / EK + (MaxW - ZWidth) / 2), (ETop = 15 / 2 + (MaxH - ZHeight) / 2));

					EleCard.style = "top:" + ETop + "px;left:" + ELeft + "px;width:" + PT.width / EK + "px;height:" + PT.height / EK + "px;"; // 确定位置
					EleCard.src = VValue.prototype.PicArr[VValue.prototype.StaticGif]; // 显示僵尸站立图片
				}
				break;

			case "SunNum":
				EleCard.style = "left:10px;top:12.5px;width:64px;height:64px;";
				EleCard.src = "images/interface/Sun.gif";
				break;
		}

		(self.SetStyle(Kind), self.SetXRay(XRay)); // 初始化显示
	},

	BirthStyle(self, Id, Ele, Style) {
		var Dom = Ele.childNodes[1]; // 获取植物实际图片
		((Dom.src = self.PicArr[self.NormalGif]), (Dom.style.height = "202px")); // 设置实际宽高
		((self.Ele = Ele), EditEle(Ele, { id: Id }, Style, EDPZ)); // 修改

		(self.InitImage(self.PotSize, self.XRay), self.FreshXRay(true)); // 初始化图片等信息
	},

	PrivateBirth(self) {
		var Id = self.id;
		var { Ele } = self; // 获取

		// 定义鼠标事件相关
		var ClickEle = (self.EleClick = NewEle(
			"dCheck_" + Id,
			"div",
			"left:" +
				Ele.style.left +
				";top:" +
				Ele.style.top +
				";position:absolute;width:80px;height:101px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:150;cursor:url(images/interface/Pointer.cur),pointer",
			{
				onclick() {
					self.Die();
				},
				onmouseover() {
					Ele.style.filter = "brightness(150%)";
					self.EleCard.style.filter = "brightness(70%)";
				},
				onmouseout() {
					Ele.style.filter = "brightness(100%)";
					self.EleCard.style.filter = "brightness(100%)";
				},
			},
			EDAll
		));

		self.ControlBase("Summon", "Auto"); // 生成底座
		self.VaseValue = self.VaseValue || { Type: "SunNum", Value: 50 }; // 如果没有信息，默认创建一个 50 阳光的罐子
	},
	getHurt(a, b, c) {
		b !== 2 && this.Die();
	}, // 受伤判定，目前是冰车不会破坏罐子，以后如果有巨人这里是需要修改的
	BoomDie() {
		this.Die(null, false);
	}, // 爆炸后，直接生成，不播放音效
	PrivateDie() {},
	InitTrigger() {}, // 特殊死亡
	Die(ImgSave, OnAudio) {
		// 是否保留图片 是否播放音效
		var self = this;
		var ID = self.id; // 定义需要用到的变量

		(self.oTrigger && oT.delP(self), (self.HP = 0)); // 删除触发器 清空血量
		(delete $P[ID], delete oGd.$[self.R + "_" + self.C + "_" + self.PKind]); // 删除本格数据
		$P.length -= 1;
		!ImgSave && ClearChild(self.Ele); // 清除图片

		if (OnAudio !== false) {
			PlaySound2(self.AudioArr[Math.floor(Math.random() * self.AudioArr.length)]);
		} // 随机播放音效

		self.ControlBase("Delete", "Auto"); // 删除底座
		(ClearChild(self.EleClick), self.PlaceItem()); // 放置物品
	},
	PlaceItem() {
		var self = this;
		var ID = self.id;
		var Val = self.VaseValue;
		var { Type } = Val;
		var { Value } = Val; // 解包

		switch (
			Type // 根据内容生成
		) {
			case "Plants": // 丢出植物卡片
				AppearCard(GetX(self.C) - self.width / 2, GetY(self.R) - 30, Value, 0, self.CardTime);
				break;

			case "Zombie": // 生成僵尸
				((Value = new Value()), ++oP.NumZombies); // 创建僵尸对象 增加僵尸数量

				// 生成僵尸
				asyncInnerHTML(
					Value.CustomBirth(self.R, self.C, 0, "auto"),
					(n, m) => {
						(EDPZ.appendChild(n), m.Birth());
						if (m.EName === "oJackinTheBoxZombie" && self.AutoJoker) {
							m.OpenBox(m.id);
						} // 如果是小丑僵尸，直接引爆爆炸
					},
					Value
				);
				break;

			case "SunNum": // 生成阳光
				if (Value > 500) {
					(AppearSun(GetX(self.C) - self.width / 2, GetY(self.R) - 30, Value - 500, 0), (Value = 500));
				} // 大于五百的阳光直接生成一个大的
				while (Value > 25) {
					(AppearSun(GetX(self.C) - self.width / 2, GetY(self.R) - 30, 25, 0), (Value -= 25));
				} // 500 以内的，一个一个生成
				(AppearSun(GetX(self.C) - self.width / 2, GetY(self.R) - 30, Value, 0), (Value = 0)); // 余下的单独生成
				break;
		}
	},
	ControlBase(Type, Ticket) {
		// 生成底座
		var BaseList = [oFlowerPot, oLilyPad];
		var LastBase = null;
		var self = this; // 底座

		if (self.BasePlant && $P[self.BasePlant.id]) {
			self.BasePlant.canEat = true;
		} // 默认先解除 canEat 状态
		if (Ticket === "Auto" && !self.AutoSummonBase) {
			return;
		} // 如果是尝试自动生成的话，直接返回

		switch (Type) {
			case "Summon": // 生成底座
				self.ControlBase("Delete", "Auto"); // 先尝试删除原绑定的底座

				if (self.CanGrow([], self.R, self.C)) {
					break;
				} // 如果可以直接种植，则直接返回

				for (var Index in BaseList) {
					// 尝试生成所有种类的底座
					if (BaseList[Index].prototype.CanGrow([], self.R, self.C)) {
						LastBase = BaseList[Index];
					}
				}

				if (LastBase) {
					// 如果可以生成
					CustomSpecial(LastBase, self.R, self.C); // 生成种类
					self.BasePlant = LastBase = oGd.$[self.R + "_" + self.C + "_" + 0]; // 获取底座
					LastBase.canEat = false; // 默认底座是不能被吃的
				}
				break;

			case "Delete": // 删除绑定的底座
				if (!self.BasePlant || !$P[self.BasePlant.id]) {
					break;
				} // 如果底座根本不存在，直接返回

				self.BasePlant.Die(); // 顺带删除底座

				break;
		}
	},
	FreshXRay(OnlySelf) {
		// 全局属性，为场上所有花瓶设置 XRAY
		var self = this;
		var Ground = oGd.$;
		var R = self.R - 1;
		var C = self.C - 1;
		var Arr = [0, 1, 2];
		var Str;
		var Pla = oGd.$Plantern;

		if (OnlySelf) {
			// 只检查自己
			if (self.AutoSetXRay === false) {
				return;
			} // 不允许改变
			self.SetXRay(false); // 默认关闭，查找周围是否有再开启
			for (var RQ in Arr) {
				for (var CQ in Arr) {
					if (Pla[1 * RQ + R + "_" + (1 * CQ + C)]) {
						self.SetXRay(true);
					}
				}
			} // 设置透视
		} else {
			for (var Q in Ground) {
				// 遍历每一个花瓶，如果是花瓶则自我检查
				if (Ground[Q] && Ground[Q].EName === "oFlowerVase") {
					Ground[Q].FreshXRay(true);
				}
			}
		}
	},

	/*
    函数介绍: 直接在 (R, C) 位置根据你的信息生成一个罐子，此属性会创建一个新的罐子
    使用说明: 
        SetR: 行, SetC: 列
        VaseColor: 罐子颜色 0普通 1绿色 2僵尸
        VaseValue: 花瓶内容信息，格式 { "Type": "Plants | Zombie | SunNum", "Value": oSunFlower | oZombie | 300, }	
        SpecialFunc: 生成前调用的函数（可选）	
    执行成功后会返回该花瓶的信息。
*/
	SpecialBirth(SetR, SetC, VaseColor, VaseValue, SpecialFunc) {
		var Obj = new oFlowerVase();

		((Obj.PotSize = VaseColor), (Obj.VaseValue = VaseValue)); // 基本信息

		if (SpecialFunc) {
			SpecialFunc(Obj);
		} // 让调用者自己操作花瓶信息

		Obj.Birth(GetX(SetC), GetY(SetR), SetR, SetC, [], null);

		return Obj;
	},

	/*
    函数介绍: 判断场上是否满足普通砸罐子关卡通关条件
    通关条件: 场地上没有罐子、且场地上没有僵尸
*/
	GetLevelStatus() {
		for (var O in $P) {
			if ($P[O].EName === "oFlowerVase") {
				return false;
			}
		} // 如果有花瓶，直接返回
		for (var O in $Z) {
			if ($Z[O].PZ !== 0) {
				return false;
			}
		} // 如果有非魅惑的僵尸，直接返回
		return true;
	},
});
