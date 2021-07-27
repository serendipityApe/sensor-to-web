/******************************************************************************
*	     DS18B20温度传感器实验		  * 
实验现象：下载程序后，数码管后4位就会显示检测的温度值	
注意事项：请开发板右下角“18b20/dht11”传感器接口处，按照丝印方向插好温度传感器																				  
*******************************************************************************/

#include "reg52.h"			 //此文件中定义了单片机的一些特殊功能寄存器
#include"temp.h"	

typedef unsigned int u16;	  //对数据类型进行声明定义
typedef unsigned char u8;

sbit LSA=P2^2;
sbit LSB=P2^3;
sbit LSC=P2^4;

sbit beep=P1^4;	//fengmingqi
sbit moto=P1^6;  //fengsham


u8 num=0;
u8 DisplayData[5]; //显示变量5个数字位
u8 code smgduan[10]={0x3f,0x06,0x5b,0x4f,0x66,0x6d,0x7d,0x07,0x7f,0x6f};

u8  bdata  B_DATA;	     //位寄存器变量
sbit  DATA0 = B_DATA^0;	 //变量第0位
sbit  DATA1 = B_DATA^1;	 //变量第1位
sbit  DATA2 = B_DATA^2;	 //变量第2位

int currentTemp=0;
int maxTemp=30;
void judge(int max,int temp){
	if(max*100>temp){
	deep=~deep;
		moto=1;
	}else{
	deep=0;
		moto=0;
	}
}
/*******************************************************************************
* 函 数 名         : delay
* 函数功能		   : 延时函数，i=1时，大约延时10us
*******************************************************************************/
void delay(u16 i)
{
	while(i--);	
}

/*******************************************************************************
* 函 数 名         : datapros()
* 函数功能		   : 温度读取处理转换函数
* 输    入         : temp
* 输    出         : 无
*******************************************************************************/
void datapros(int temp) 	 
{
   	float tp;  
	if(temp < 0)				//当温度值为负数
  	{
		DisplayData[0] = 0x40; 	  //   -
		//因为读取的温度是实际温度的补码，所以减1，再取反求出原码
		temp=temp-1;
		temp=~temp;
		tp=temp;
		temp=tp*0.0625*100+0.5;	
		//留两个小数点就*100，+0.5是四舍五入，因为C语言浮点数转换为整型的时候把小数点
		//后面的数自动去掉，不管是否大于0.5，而+0.5之后大于0.5的就是进1了，小于0.5的就
		//算加上0.5，还是在小数点后面。
  	}
 	else
  	{			
		DisplayData[0] = 0;
		tp=temp;//因为数据处理有小数点所以将温度赋给一个浮点型变量
		//如果温度是正的那么，那么正数的原码就是补码它本身
		temp=tp*0.0625*100+0.5;	
		//留两个小数点就*100，+0.5是四舍五入，因为C语言浮点数转换为整型的时候把小数点
		//后面的数自动去掉，不管是否大于0.5，而+0.5之后大于0.5的就是进1了，小于0.5的就
		//算加上0.5，还是在小数点后面。
			currentTemp=temp;
			
	}
	DisplayData[1] = smgduan[temp % 10000 / 1000];   //2xxx
	DisplayData[2] = smgduan[temp % 1000 / 100] | 0X80;  //x2xx
	DisplayData[3] = smgduan[temp % 100 / 10];  //xx2x
	DisplayData[4] = smgduan[temp % 10 / 1];  //xxx2
	
}

/*******************************************************************************
* 函数名         :DigDisplay()
* 函数功能		 :数码管显示函数
* 输入           : 无
* 输出         	 : 无
*******************************************************************************/
void DigDisplay()
{
	u8 i;
	for(i=0;i<5;i++)
	{
		B_DATA = i+3;   //位选，选择点亮的数码管，=0000 0***
		LSA = DATA0;
		LSB = DATA1;
		LSC = DATA2;

		P0=DisplayData[i];//发送数据
		delay(100);       //间隔一段时间扫描	
		P0=0x00;          //消隐
	}		
}

/*******************************************************************************
* 函 数 名       : main
* 函数功能		 : 主函数
* 输    入       : 无
* 输    出    	 : 无
*******************************************************************************/
void main()
{
	
	while(1)
	{
		datapros(Ds18b20ReadTemp());	//数据处理函数
		judge(maxTemp,currentTemp);
		DigDisplay();					//数码管显示函数
	}		
}