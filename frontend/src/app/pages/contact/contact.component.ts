import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in">
      <!-- Hero Section -->
      <section class="position-relative overflow-hidden py-5 mt-n4 mb-5" style="background: linear-gradient(135deg, rgba(82,40,245,0.05) 0%, rgba(200,90,250,0.05) 100%);">
        <div class="container py-md-5 position-relative z-1">
          <div class="row align-items-center g-5">
            <div class="col-lg-6 text-center text-lg-start">
              <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3 fw-medium border border-primary-subtle d-inline-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chat-dots-fill me-2" viewBox="0 0 16 16">
                  <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
                Get In Touch
              </span>
              <h1 class="display-4 fw-bold mb-4 text-dark lh-sm">
                We'd Love To <br class="d-none d-lg-block"> Hear From <span class="text-primary text-gradient">You</span>
              </h1>
              <p class="lead text-muted mb-5 pe-lg-5">
                Have an inquiry about admissions, programs, or just want to say hi? Drop us a line and our expert support team will get back to you as soon as possible.
              </p>
              <div class="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                  <a href="#contactForm" class="btn btn-primary btn-lg rounded-pill px-5 shadow-sm nav-link-custom">Send a Message</a>
              </div>
            </div>
            <div class="col-lg-6 position-relative text-center">
               <div class="position-absolute shadow border border-light opacity-50" style="width: 300px; height: 300px; background: radial-gradient(circle, var(--accent) 0%, rgba(200,90,250,0) 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; filter: blur(50px); z-index: -1;"></div>
               <img src="assets/contact_hero.png" alt="Contact Us Illustration" class="img-fluid" style="max-height: 480px; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1)); animation: float 6s ease-in-out infinite;">
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Info Cards -->
      <section class="container mb-5 pb-5">
        <div class="row g-4 justify-content-center mt-n5 position-relative z-2">
           <div class="col-md-4">
              <div class="card h-100 border-0 shadow-sm rounded-4 text-center hover-lift transition-all p-4">
                 <div class="card-body">
                    <div class="bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center rounded-circle mb-4 shadow-sm" style="width: 64px; height: 64px;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                    </div>
                    <h5 class="fw-bold mb-3">Our Location</h5>
                    <p class="text-muted mb-0">123 University Avenue,<br>VNSGU Park, Surat - 395006<br>India</p>
                 </div>
              </div>
           </div>
           
           <div class="col-md-4">
              <div class="card h-100 border-0 shadow-sm rounded-4 text-center hover-lift transition-all p-4">
                 <div class="card-body">
                    <div class="bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center rounded-circle mb-4 shadow-sm" style="width: 64px; height: 64px;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-envelope-paper-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6.5 9.5 3 7.5v-6A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v6l-3.5 2L8 8.75l-1.5.75ZM1.059 3.635 2 3.145v3.504l-.059.034A2 2 0 0 0 0 8.5V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8.5a2 2 0 0 0-.941-1.817l-.059-.034V3.145l.941.49A2 2 0 0 1 16 5.4V15a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765ZM16 15.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5V8.5a1 1 0 0 1 .529-.882l.971-.56V15h13V7.058l.971.56a1 1 0 0 1 .529.882v7z"/>
                      </svg>
                    </div>
                    <h5 class="fw-bold mb-3">Email Us</h5>
                    <p class="text-muted mb-0">
                      <strong>General:</strong> info&#64;studenttech.com<br>
                      <strong>Support:</strong> support&#64;studenttech.com
                    </p>
                 </div>
              </div>
           </div>

           <div class="col-md-4">
              <div class="card h-100 border-0 shadow-sm rounded-4 text-center hover-lift transition-all p-4">
                 <div class="card-body">
                    <div class="bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center rounded-circle mb-4 shadow-sm" style="width: 64px; height: 64px;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-telephone-inbound-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM15.854 2.146a.5.5 0 0 1 0 .708L11.707 7H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793l4.146-4.147a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    </div>
                    <h5 class="fw-bold mb-3">Call Support</h5>
                    <p class="text-muted mb-0">
                      <strong>Toll Free:</strong> +91 1234567891<br>
                      <strong>Local:</strong> +91 1020304050
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <!-- Contact Form Section -->
      <section id="contactForm" class="container mb-5 pb-5">
         <div class="row justify-content-center">
            <div class="col-lg-10">
               <div class="card border-0 shadow-lg overflow-hidden rounded-4">
                  <div class="row g-0">
                     <!-- Left Side Info -->
                     <div class="col-md-5 bg-primary text-white p-5 d-flex flex-column justify-content-between position-relative overflow-hidden">
                        <div class="position-absolute top-0 end-0 opacity-10" style="transform: translate(30%, -30%);">
                           <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" fill="currentColor" class="bi bi-headset" viewBox="0 0 16 16">
                             <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/>
                           </svg>
                        </div>
                        <div class="position-absolute bottom-0 start-0 w-100" style="height: 150px; background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 100%); clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 50%);"></div>
                        
                        <div class="position-relative z-1">
                          <h3 class="fw-bold mb-4">Let's Talk</h3>
                          <p class="text-white-50 mb-4">Fill out the form and our team will get back to you within 24 hours.</p>
                          <hr class="border-light opacity-25 mb-4">
                          <ul class="list-unstyled mb-0 d-flex flex-column gap-3">
                             <li class="d-flex align-items-center">
                               <div class="bg-white bg-opacity-10 p-2 rounded-circle me-3">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>
                               </div>
                               Support available 24/7
                             </li>
                             <li class="d-flex align-items-center">
                               <div class="bg-white bg-opacity-10 p-2 rounded-circle me-3">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16"><path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/><path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/><path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/></svg>
                               </div>
                               Faster response times
                             </li>
                             <li class="d-flex align-items-center">
                               <div class="bg-white bg-opacity-10 p-2 rounded-circle me-3">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16"><path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/><path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/></svg>
                               </div>
                               Complete privacy
                             </li>
                          </ul>
                        </div>
                     </div>
                     
                     <!-- Right Side Form -->
                     <div class="col-md-7 p-5 bg-white">
                        <form (submit)="onSubmit($event)">
                           <div class="row g-4 mb-4">
                              <div class="col-md-6">
                                 <div class="form-floating">
                                    <input type="text" class="form-control bg-light border-0" id="name" placeholder="John Doe" required>
                                    <label for="name" class="text-muted">Full Name</label>
                                 </div>
                              </div>
                              <div class="col-md-6">
                                 <div class="form-floating">
                                    <input type="email" class="form-control bg-light border-0" id="email" placeholder="name@example.com" required>
                                    <label for="email" class="text-muted">Email Address</label>
                                 </div>
                              </div>
                           </div>
                           <div class="mb-4">
                              <div class="form-floating">
                                 <select class="form-select bg-light border-0" id="subject" aria-label="Subject Selection">
                                   <option selected disabled>Choose a subject</option>
                                   <option value="1">Admissions Inquiry</option>
                                   <option value="2">Technical Support</option>
                                   <option value="3">Partnership & Events</option>
                                   <option value="4">Other</option>
                                 </select>
                                 <label for="subject" class="text-muted">Subject</label>
                              </div>
                           </div>
                           <div class="mb-4">
                              <div class="form-floating">
                                 <textarea class="form-control bg-light border-0" placeholder="Leave a message here" id="message" style="height: 120px" required></textarea>
                                 <label for="message" class="text-muted">Your Message</label>
                              </div>
                           </div>
                           <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill d-flex align-items-center justify-content-center">
                              Send Message
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill ms-2" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                              </svg>
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  `,
  styles: [`
    .hover-lift {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .hover-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
  `]
})
export class ContactComponent {
  onSubmit(event: Event) {
    event.preventDefault();
    alert('Thank you for your message! Our team will get back to you shortly.');
  }
}
