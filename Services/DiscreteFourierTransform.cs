using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FourierExperiments.Services
{
    public class DiscreteFourierTransform
    {
        public static List<FourierY> Transform(List<double> x)
        {
            List<FourierY> X = new();

            int N = x.Count();

            for (var k = 0; k < N; k++)
            {
                double re = 0;
                double im = 0;

                for (var n = 0; n < N; n++)
                {
                    double phi = (Math.PI * 2 * k * n) / N;
                    re += x[n] * (float)Math.Cos(phi);
                    im -= x[n] * (float)Math.Sin(phi);
                }

                re = re / N;
                im = im / N;

                double freq = k;
                double amp = Math.Sqrt(Math.Pow(re, 2) + Math.Pow(im, 2));
                double phase = Math.Atan2(im, re);

                X.Add(new FourierY(re, im, freq, amp, phase));
            }

            return X;
        }

        public class FourierY
        {
            public double X { get; set; }
            public double Y { get; set; }
            public double Freq { get; set; }
            public double Amp { get; set; }
            public double Phase { get; set; }

            public FourierY(double x, double y, double freq, double amp, double phase)
            {
                X = x;
                Y = y;
                Freq = freq;
                Amp = amp;
                Phase = phase;
            }
        }
    }
}
